import { SeatType } from '../types/Seat.type';
type SeatProps = {
    seat: SeatType
}

export const Seat = (props: SeatProps) => {
    const seat = props.seat;

    return (
        <div>
            <h4>MAC { seat.mac.num }</h4>
            { seat.student
                ? (
                  <p>Yes student</p>
                )
                : (
                <p>Student</p>
                )
            }
        </div>
    );
};
