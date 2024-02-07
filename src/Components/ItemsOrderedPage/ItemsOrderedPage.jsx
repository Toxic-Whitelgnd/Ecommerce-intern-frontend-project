import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import "../../Styles/global.css";

const ItemsOrderedPage = () => {
    useEffect(() => {
        fetchItems();
    }
        , []);

    const userid = Cookies.get('userid');
    console.log(Cookies.get());

    const [pdtdata, setData] = useState('');
    const fetchItems = async () => {
        const res = await axios.get(`https://localhost:7101/items/ItemsOrdered/itemsbyuid?uid=${userid}`);
        console.log(res.data);
        setData(res.data);
 

    }

    
    const groupedItems = pdtdata ? pdtdata.reduce((groups, item) => {
        const date = item.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(item);
        return groups;
    }, {}) : null ;

    return (
        <div>
            <h3>Items that you have ordered </h3>

            {
                pdtdata && (
                    <>
                    {Object.keys(groupedItems).map(date => (
                <div key={date}>
                    <h2 className='ms-3'>Items ordered on {date}</h2>
                    {groupedItems[date].map(item => (
                        <>
                        <div key={item.id} className='IOcontainer'>
                            <p className='Io'>{item.productName}</p>
                            <p  className='Io'>Quantity: {item.productQty}</p>
                            <p  className='Io'>Size: {item.productSize}</p>
                            <p  className='Io'>Total: {item.productTotal}</p>
                        </div>
                        <div>-------------------------------------------------------------</div>
                        <br></br>
                        </>
                    ))}
                </div>
            ))}
                    
                    </>
                )
            }

            

        </div>
    );
}

export default ItemsOrderedPage;
