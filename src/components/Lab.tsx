import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut } from '../actions';
import { Seat } from './Seat';
import { StudentType } from '../types/Student.type';
import { SeatsType } from '../types/Seat.type';
import supabase from '../config/supabase-client';
import _ from 'lodash';

export const Lab = () => {
    // global state
    const dispatch = useDispatch();
    const user:any = useSelector<any>(state => state.user);

    // local state
    const [seats, setSeats] = useState<SeatsType | null>(null);
    const [loading, setLoading] = useState(false);

    // onload
    useEffect(() => {
        // get session
        const getSession = async () => {
            setLoading(true);

            const { data, error } = await supabase.auth.getSession();

            if(error) {
                alert(`UNABLE TO GET SESSION\n\n${error.message}`);
            }

            if(data) {
                const identities = data.session?.user.identities;
                if(identities)
                    dispatch(signIn(identities[0]));
            }
        };
        getSession().then(r => {
            // get seat plan
            const getSeatPlan = async () => {
                const { data, error } = await supabase
                    .from('seatplan')
                    .select()
                    .order('id');

                if(error) {
                    alert(`UNABLE TO GET SEAT PLAN\n\n${error.message}`);
                }

                if(data) {
                    // populate seats
                    const tempSeats:SeatsType = {};
                    for(let i=1; i<=40; i++) {
                        tempSeats[`mac${i}`] = {
                            mac: { num: i},
                            student: null
                        }
                    }
                    data.map(row => {
                        if(row.username) {
                            tempSeats[`mac${row.id}`].student = {
                                name: row.full_name,
                                username: row.username
                            }
                        }
                    });
                    setSeats(tempSeats);
                }
            };

            getSeatPlan().then(r => {
                setLoading(false);
            });
        });
    }, []);


    // clear seat
    const upd = (remove:number, update:number, student:StudentType) => {
        const updatedSeats = _.cloneDeep(seats);
        if(updatedSeats) {
            if(remove > 0)
                updatedSeats[`mac${remove}`].student = null;
            if(update > 0)
                updatedSeats[`mac${update}`].student = student
            setSeats(updatedSeats);
        }
    };


    // sign in
    const handleSignIn = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github'
        });
    };

    // sign out
    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if(!error)
            dispatch(signOut());
    };

    return (
        <div>
            <header>
                <div className="container">
                    { user
                        ? (
                            <>
                                <img
                                    src={`https://avatars.githubusercontent.com/${user.identity_data.user_name}`}
                                    alt={user.identity_data.user_name}
                                />
                                <div className="user-name">
                                    <p><b>{ user.identity_data.full_name }</b></p>
                                    <p><small>@{user.identity_data.user_name}</small></p>
                                </div>
                                <button onClick={handleSignOut}>Sign out</button>
                            </>
                        )
                        : (
                            <>
                                <div className="img-placeholder"></div>
                                <button onClick={handleSignIn}>Sign in with GitHub</button>
                            </>
                        )
                    }
                </div>
            </header>

            <h2 className="title"><span>BSIT-3A</span><br/>SEAT PLAN FOR MAC LAB</h2>

            <main>
                { loading && (
                    <p className="loader">
                        Loading...
                    </p>
                )}
                { seats && (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={6} className="clear"></th>
                                    <th colSpan={2} align="center" className="clear">
                                        <div className="teacher-table">
                                            Teacher's Table
                                        </div>
                                    </th>
                                    <th colSpan={6} className="clear"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* 1st Row */}
                                <tr>
                                    <td>PRINTER</td>
                                    <td><Seat seat={seats.mac31} upd={upd}/></td>
                                    <td><Seat seat={seats.mac32} upd={upd}/></td>
                                    <td><Seat seat={seats.mac33} upd={upd}/></td>
                                    <td><Seat seat={seats.mac34} upd={upd}/></td>
                                    <td><Seat seat={seats.mac35} upd={upd}/></td>
                                    <td className="clear"></td>
                                    <td className="clear"></td>
                                    <td><Seat seat={seats.mac36} upd={upd}/></td>
                                    <td><Seat seat={seats.mac37} upd={upd}/></td>
                                    <td><Seat seat={seats.mac38} upd={upd}/></td>
                                    <td><Seat seat={seats.mac39} upd={upd}/></td>
                                    <td><Seat seat={seats.mac40} upd={upd}/></td>
                                    <td>PRINTER</td>
                                </tr>

                                {/* 2nd Row */}
                                <tr>
                                    <td><Seat seat={seats.mac30} upd={upd}/></td>
                                    <td><Seat seat={seats.mac29} upd={upd}/></td>
                                    <td><Seat seat={seats.mac28} upd={upd}/></td>
                                    <td><Seat seat={seats.mac27} upd={upd}/></td>
                                    <td><Seat seat={seats.mac26} upd={upd}/></td>
                                    <td><Seat seat={seats.mac20} upd={upd}/></td>
                                    <td className="clear"></td>
                                    <td className="clear"></td>
                                    <td><Seat seat={seats.mac19} upd={upd}/></td>
                                    <td><Seat seat={seats.mac25} upd={upd}/></td>
                                    <td><Seat seat={seats.mac24} upd={upd}/></td>
                                    <td><Seat seat={seats.mac23} upd={upd}/></td>
                                    <td><Seat seat={seats.mac22} upd={upd}/></td>
                                    <td><Seat seat={seats.mac21} upd={upd}/></td>
                                </tr>

                                {/* 3rd Row */}
                                <tr>
                                    <td><Seat seat={seats.mac7} upd={upd}/></td>
                                    <td><Seat seat={seats.mac8} upd={upd}/></td>
                                    <td><Seat seat={seats.mac9} upd={upd}/></td>
                                    <td><Seat seat={seats.mac10} upd={upd}/></td>
                                    <td><Seat seat={seats.mac11} upd={upd}/></td>
                                    <td><Seat seat={seats.mac12} upd={upd}/></td>
                                    <td className="clear"></td>
                                    <td className="clear"></td>
                                    <td><Seat seat={seats.mac13} upd={upd}/></td>
                                    <td><Seat seat={seats.mac14} upd={upd}/></td>
                                    <td><Seat seat={seats.mac15} upd={upd}/></td>
                                    <td><Seat seat={seats.mac16} upd={upd}/></td>
                                    <td><Seat seat={seats.mac17} upd={upd}/></td>
                                    <td><Seat seat={seats.mac18} upd={upd}/></td>
                                </tr>

                                {/* 4th Row */}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td colSpan={2}>PRINTER</td>
                                    <td><Seat seat={seats.mac6} upd={upd}/></td>
                                    <td><Seat seat={seats.mac5} upd={upd}/></td>
                                    <td className="clear"></td>
                                    <td className="clear"></td>
                                    <td><Seat seat={seats.mac4} upd={upd}/></td>
                                    <td><Seat seat={seats.mac3} upd={upd}/></td>
                                    <td><Seat seat={seats.mac2} upd={upd}/></td>
                                    <td><Seat seat={seats.mac1} upd={upd}/></td>
                                    <td colSpan={2}>PRINTER</td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}
            </main>
        </div>
    );
};
