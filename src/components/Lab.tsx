import '../assets/room.css';
import { useState, useEffect } from 'react';
import { Seat } from './Seat';
import { SeatsType } from '../types/Seat.type';

export const Lab = () => {
    const [seats, setSeats] = useState<SeatsType | null>(null);

    // populate seats
    useEffect(() => {
        const tempSeats:SeatsType = {};
        for(let i=1; i<=40; i++) {
            tempSeats[`mac${i}`] = {
                mac: { num: i},
                student: null
            }
        }
        setSeats(tempSeats);
    }, []);

    return (
        <div>
            { seats && (
                <table border={1} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th colSpan={6}></th>
                            <th colSpan={2} align="center">
                                SEAT PLAN FOR MAC LAB
                                <br/>
                                Teacher's Table
                            </th>
                            <th colSpan={6}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 1st Row */}
                        <tr>
                            <td>PRINTER</td>
                            <td><Seat seat={seats.mac31}/></td>
                            <td><Seat seat={seats.mac32}/></td>
                            <td><Seat seat={seats.mac33}/></td>
                            <td><Seat seat={seats.mac34}/></td>
                            <td><Seat seat={seats.mac35}/></td>
                            <td colSpan={2}></td>
                            <td><Seat seat={seats.mac36}/></td>
                            <td><Seat seat={seats.mac37}/></td>
                            <td><Seat seat={seats.mac38}/></td>
                            <td><Seat seat={seats.mac39}/></td>
                            <td><Seat seat={seats.mac40}/></td>
                            <td>PRINTER</td>
                        </tr>

                        {/* 2nd Row */}
                        <tr>
                            <td><Seat seat={seats.mac30}/></td>
                            <td><Seat seat={seats.mac29}/></td>
                            <td><Seat seat={seats.mac28}/></td>
                            <td><Seat seat={seats.mac27}/></td>
                            <td><Seat seat={seats.mac26}/></td>
                            <td><Seat seat={seats.mac20}/></td>
                            <td colSpan={2}></td>
                            <td><Seat seat={seats.mac19}/></td>
                            <td><Seat seat={seats.mac25}/></td>
                            <td><Seat seat={seats.mac24}/></td>
                            <td><Seat seat={seats.mac23}/></td>
                            <td><Seat seat={seats.mac22}/></td>
                            <td><Seat seat={seats.mac21}/></td>
                        </tr>

                        {/* 3rd Row */}
                        <tr>
                            <td><Seat seat={seats.mac7}/></td>
                            <td><Seat seat={seats.mac8}/></td>
                            <td><Seat seat={seats.mac9}/></td>
                            <td><Seat seat={seats.mac10}/></td>
                            <td><Seat seat={seats.mac11}/></td>
                            <td><Seat seat={seats.mac12}/></td>
                            <td colSpan={2}></td>
                            <td><Seat seat={seats.mac13}/></td>
                            <td><Seat seat={seats.mac14}/></td>
                            <td><Seat seat={seats.mac15}/></td>
                            <td><Seat seat={seats.mac16}/></td>
                            <td><Seat seat={seats.mac17}/></td>
                            <td><Seat seat={seats.mac18}/></td>
                        </tr>

                        {/* 4th Row */}
                        <tr>
                            <td></td>
                            <td></td>
                            <td colSpan={2}>PRINTER</td>
                            <td><Seat seat={seats.mac6}/></td>
                            <td><Seat seat={seats.mac5}/></td>
                            <td colSpan={2}></td>
                            <td><Seat seat={seats.mac4}/></td>
                            <td><Seat seat={seats.mac3}/></td>
                            <td><Seat seat={seats.mac2}/></td>
                            <td><Seat seat={seats.mac1}/></td>
                            <td colSpan={2}>PRINTER</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};
