import React from 'react';

const MessbillDetail = ({messbills}) => {
    return (
        <div>
            <table>
                         <thead>
                            <tr>
                                <th>DATE</th>
                                <th>AMOUNT</th>
                                <th>No.of.Open_Cards</th>
                                <th>COST PER CARD</th>

                            </tr>
                        </thead>
                    <tbody>
                    {
                             messbills.map((bill) => {
                                 return (
                                <tr key={`${bill.date}`}>
                                         <td>{`${bill.date}`}</td>
                                         <td>{`${bill.amount.toFixed(2)}`}</td>   
                                         <td>{`${bill.no_of_open_cards}`}</td>   
                                         <td>{`${bill.bill_per_card.toFixed(2)}`}</td>   
                                </tr>
                            )   
                        })
                    }
                    </tbody>
                    </table>
        </div>
    )
}


export default MessbillDetail;