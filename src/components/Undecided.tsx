import { SeatsType } from '../types/Seat.type';

type UndecidedProps = {
    seats: SeatsType | null,
    members: Array<string>
}

export const Undecided = (props: UndecidedProps) => {
    const members = props.members;
    const lowercaseMembers = members.map(member => member.toLowerCase());

    if(props.seats) {
        // remove present members
        Object.values(props.seats).map(seat => {
            if(seat.student) {
                const index = lowercaseMembers.indexOf(seat.student.username.toLowerCase());
                if(index >= 0) {
                    members.splice(index, 1);
                    lowercaseMembers.splice(index, 1);
                }
            }
        });
    }

    if(members.length <= 0)
        return <></>;

    return (
        <div className="undecided">
            <p>waiting for:</p>
            { members.map(member => (
                <small key={member} className="member">
                    <a href={`https://github.com/${member}`} target='blank'>
                        @{member}
                    </a>
                </small>
            ))}
        </div>
    );
};
