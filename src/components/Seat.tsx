import { StudentType } from '../types/Student.type';
import { SeatType } from '../types/Seat.type';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import supabase from '../config/supabase-client';

type SeatProps = {
    seat: SeatType,
    upd : (remove: number, update: number, student: StudentType) => void
}

export const Seat = (props: SeatProps) => {
    // global state
    const dispatch = useDispatch();
    const user:any = useSelector<any>(state => state.user);

    // local state and props
    const seat = props.seat;
    const [loading, setLoading] = useState(false);

    // handle picking of seat
    const handlePick = async () => {
        setLoading(true);

        // check if not picked
        const { data, error } = await supabase
            .from('seatplan')
            .select('full_name')
            .eq('id', seat.mac.num)
            .single()

        if(error) {
            setLoading(false);
        }

        if(data) {
            setLoading(false);

            // check if seat was already picked by others
            if(data.full_name) {
                alert(`SEAT ALREADY TAKEN!\n\n MAC ${seat.mac.num} was already picked by ${data.full_name}.`);
                window.location.reload();
            }
            else {
                // remove previous record
                let remove = -1;
                await supabase
                    .from('seatplan')
                    .update({
                        username: null,
                        full_name: null
                    })
                    .eq('username', user.identity_data.user_name)
                    .select('id')
                    .then(response => {
                        if(response.error)
                            alert(response.error.message);
                        else {
                            if(response.data[0]) {
                                const id = response.data[0].id;
                                if (id)
                                    remove = id;
                            }
                        }
                    });

                // update new record
                await supabase
                    .from('seatplan')
                    .update({
                        username : user.identity_data.user_name,
                        full_name: user.identity_data.full_name
                    })
                    .eq('id', seat.mac.num)
                    .then(response => {
                        if(response.error)
                            alert(response.error.message);
                        else {
                            props.upd(remove, seat.mac.num, {
                                name: user.identity_data.full_name,
                                username: user.identity_data.user_name
                            });
                        }
                    });
            }
        }
    };

    return (
        <div
            className={
                'seat'
                + (seat.student ? ((seat.student.username === user?.identity_data?.user_name ? ' self ' : ' ') + 'taken') : '')
            }
        >
            <h4 style={{marginTop: 0}}>MAC { seat.mac.num }</h4>
            { seat.student
                ? (
                    <div className="content">
                        {
                            seat.student.name !== ''
                            ? <small>{seat.student.name}</small>
                            : <small>{seat.student.username}</small>
                        }
                    </div>
                )
                : (
                    <div className="content">
                        <p>&nbsp;</p>
                        { user && (
                            <div>
                                <button onClick={handlePick} disabled={loading}>Pick</button>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    );
};
