import { useEffect, useState } from "react";
import {addDoc, collection, deleteDoc, doc, getDocs, Timestamp, updateDoc} from 'firebase/firestore';
import { db } from "../database/config";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { Modal } from "bootstrap";
// import './App.css';
// import './bootstrap.min.css';
// import { Logout } from "./Auth";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./users-config";

const Home = () => {
    const [orderList,setOrderList] = useState([]);
    const [searchId,setId] = useState('');
    const [searchProduct,setProduct] = useState('');
    const [date,setDate] = useState('');
    const [skuid,setSkuid] = useState('');
    const [orderid,setOrderid] = useState('');
    const [productName,setProductName] = useState('');
    // const [origin,setOrigin] = useState('');
    // const [price,setPrice] = useState('');
    // const [store1,setStore1] = useState(0);
    // const [store2,setStore2] = useState(0);
    // const [store3,setStore3] = useState(0);

    const itemCollectionRef = collection(db,"Item");
    
    //to check if the user is logged in or not
    //  useEffect(() => {
    //     onAuthStateChanged(auth,(user) => {
    //         if(!user){
    //             window.location.href="/";
    //         }
    //     })
    // },[]);

    useEffect(() => {
       const getOrders = async () => {
            const data = await getDocs(itemCollectionRef);
            setItemList(data.docs.map((doc) => ({
                ...doc.data(),
                id:doc.id
            })));
        }
        getOrders();
    },[]);
    //saving the selected checkboxes as a pdf
    // const generatePDF = () => {
    //     var columns = [
    //         { title: "Date", dataKey: "Date" },
    //         { title: "SKUID", dataKey: "SKUID" },
    //         { title: "Order_ID", dataKey: "Order_ID" },
    //         { title: "Product_Name", dataKey: "Product_Name"},
    //         { title: "Origin", dataKey: "Origin" },
    //     ];

    //     var arrayg  = [];
    //     orderList.map((d) => {
    //         if(d.select){
    //             arrayg.push(d);
    //         }
    //     })

    //     var rows = arrayg.map((d)=>{
    //         return { Date: d.Date, SKUID: d.skuid, Order_ID : d.orderid , Product_Name:d.productName, Origin: d.origin  };
    //     })
    
        
    //     var columns1 = [
        
    //         { title: "Store_1_Order", dataKey: "Store_1_Order" },
    //         { title: "Price_$", dataKey: "Price_$" },
    //         { title: "Store_2_Order", dataKey: "Store_2_Order" },
    //         { title: "Store_3_Order", dataKey: "Store_3_Order" },
    //         { title: "Buyer_Order", dataKey: "Buyer_Order" },
    //         {title:"Total_Order",dataKey:"Total_Order"},
    //         { title: "Order_Status",dataKey:"Order_Status"}
    //     ]
        
    //     var rows1 =  arrayg.map((d)=>{
           
    //         return { Store_1_Order:d.store1order ,
    //             Price_$:d.price , 
    //             Store_2_Order:d.store2order , 
    //             Store_3_Order:d.store3order , 
    //             Buyer_Order:d.buyerOrder ,
    //             Total_Order:d.store1order+d.store2order+d.store3order,
    //             Order_Status:d.status + " "+d.subdate};
    //         })
        
    //     var today = new Date();
    //     var date = today.getFullYear()+"."+today.getMonth()+"."+today.getDate();
    //     var doc = new jsPDF('p', 'pt');
    //     doc.setFontSize(20);
    //     doc.setTextColor(40);
    //     doc.text("Order report", 10, 20);
    //     doc.text(`date: ${date}`, 10, 50);
        
    //     doc.autoTable(columns, rows, {
    //         startY: doc.autoTableEndPosY() + 70,
    //         margin: { horizontal: 10 },
    //         styles: { overflow: 'linebreak' },
    //         bodyStyles: { valign: 'center', halign: 'middle' },
    //         columnStyles: { email: { columnWidth: 'wrap' } },
    //         theme: "striped"
    //     });
        
    //     doc.autoTable(columns1, rows1, {
    //         startY: doc.autoTableEndPosY() + 70,
    //         margin: { horizontal: 10 },
    //         styles: { overflow: 'linebreak' },
    //         bodyStyles: { valign: 'middle', halign: 'middle' },
    //         columnStyles: { email: { columnWidth: 'wrap' } },
    //         theme: "striped"
    //     }); 
    //     doc.save('report.pdf');
    // };
    //Add an Order
    const addItem = () => {
        const data = addDoc(itemCollectionRef,{
            Date:date,
            skuid:skuid,
            orderid:orderid,
            productName:productName,
            // origin:origin,
            // price:price,
            // store1order:store1,
            // store2order:store2,
            // store3order:store3,
            // status:"Not Submitted by HQ",
            subdate:""
        });
    };

    itemList.map((d) => {
        return {
            select:false,
            id:d.id,
            skuid:d.skuid,
            orderid:d.orderid,
            productName:d.productName,
            // origin:d.origin,
            // price:d.price,
            // store1order:d.store1order,
            // store2order:d.store2order,
            // store3order:d.store3order,
            // buyerOrder:d.buyerOrder,
            status:d.status
        };
    });

    //deleting multiple orders using a checkbox
    const deleteOrder = () => {
        let arrayIds = [];
        orderList.forEach(d => {
            if(d.select) {
                arrayIds.push(d.id);
            }
        });
        const array = arrayIds.slice("/");
        array.forEach(element => {
            const order = doc(db,"Item",element);
            deleteDoc(order);
        });
    }
    //updating multiple buyerOrder values using a checkbox
    const updateitem = () => {
            let arrayIds = [];
            let arrayOds = [];
            let array = [];

            itemList.forEach(d => {
                if(d.select) {
                    // d.status="Submitted by HQ"
                    d.subdate=Timestamp.now().toDate().toString().split("G")[0];
                    let obj = {};
                    obj.id = d.id;
                    arrayIds.push(d.id);
                    arrayOds.push(d.buyerOrder);
                    obj.buyerOrder = d.buyerOrder;
                    array.push(JSON.stringify(obj));
                }
            });

            let array1 = arrayIds.slice(",");
            let array2 = arrayOds.slice(",");

            for (let i = 0; i < array1.length; i++) {
                const newField = {buyerOrder:array2[i],status:"Submitted by HQ",subdate:Timestamp.now().toDate().toString().split("G")[0]};
                const newOrder = doc(db,"orders",array1[i]);
                updateDoc(newOrder,newField);
            }
        const list = orderList.map((d) => {
                d.select = false;
                d.checked = false;
                return d;
            });
         setOrderList(list);
    }
    //logout function
    const logout = async() => {
        await Logout();
        window.location.href="/";
    }
    return (  
        <div className="App container-fluid">
            <h4>BUYER DASHBOARD</h4>

            <form className='form row'>
                <div className='col col-sm-4'>

                    <input className='form-control' type="search" placeholder='Search By SKUID' onChange={(event) =>{
                        setId(event.target.value);
                    }}/><br/>

                    <input className='form-control' type="search" placeholder='Search By PRODUCT NAME' onChange={(event) =>{
                        setProduct(event.target.value);
                    }}/>
                </div>
            </form><br/>

                <table className="table table-secondary table-hover">
                    <thead>
                        <tr>
                            <th><input type="checkbox"  onChange={(event) => {
                                    
                                    let checked = event.target.checked;
                                    setOrderList(orderList.map((d)=>{
                                        d.select = checked;
                                        return d;
                                    }));
                                }} /></th>
                            <th>Date</th>
                            <th>SKUID</th>
                            <th>Order ID</th>
                            <th>Product Name</th>
                            <th>Origin</th>
                            <th>Price USD($)</th>
                            <th>Store 1 Order</th>
                            <th>Store 2 Order</th>
                            <th>Store 3 Order</th>
                            <th>Total Order</th>
                            <th>Buyer Order</th>
                            <th>Order Status</th>
                        </tr>
                    </thead>
                {
                    orderList.filter((val) => {
                        if(searchProduct === '' && searchId === '') {
                            return val;
                        } else if(val.productName.toLowerCase().includes(searchProduct.toLowerCase())) {
                            return val;
                        }
                    }).filter((val) => {
                        if(val.skuid.toLowerCase().includes(searchId.toLowerCase())) {
                            return val;
                        }
                    }).map((val,key) => {
                        return (
                           <tbody>
                               <tr key={key}>
                                    <td><input type="checkbox" onChange={(event) => {
                                        let checked = event.target.checked;
                                        setOrderList(orderList.map((data) => {
                                            if(val.id === data.id){
                                                data.select = checked;
                                            }
                                            return data;
                                        }));
                                    }} checked={val.select}/></td>
                                    <td>{val.Date}</td>
                                    <td>{val.skuid}</td>
                                    <td>{val.orderid}</td>
                                    <td>{val.productName}</td>
                                    <td>{val.origin}</td>
                                    <td>{val.price}</td>
                                    <td>{val.store1order}</td>
                                    <td>{val.store2order}</td>
                                    <td>{val.store3order}</td>
                                    <td>{val.store1order + val.store2order + val.store3order}</td>
                                    <td><input type="number" value={val.buyerOrder} required onChange={(event) => {

                                        let od = event.target.value;
                                        var list4 =  orderList.map((d) => {

                                            if(d.id ===val.id){ 
                                                d.buyerOrder = od;
                                            }
                                            return d;
                                            
                                        });
                                        setOrderList(list4);
                                    }}/></td>
                                    <td className="fw-bold">{val.status +" " + val.subdate}</td>
                               </tr>
                           </tbody>
                        );
                    })
                }
                </table>

                <button className="btn btn-primary" onClick={updateOrder}>Submit</button>
                <button className="btn btn-primary" style={{ marginLeft:"105px" }} onClick={generatePDF}>Save PDF</button>
                <button className="btn btn-primary" style={{ marginLeft:"105px"}} data-bs-toggle="modal" data-bs-target="#addOrder">Add Order</button>
                <button className="btn btn-primary" style={{ marginLeft:"105px"}} onClick={deleteOrder}>Delete Order</button>
                <button className="btn btn-primary" style={{ marginLeft:"105px"}} onClick={logout}>Logout</button>

                {/* Add Order Modal */}
                <div class="modal fade" id="addOrder" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Add An Order</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                            <div class="modal-body">
                                <div class="container-fluid">
                                    <form className="form">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Date</span>
                                            <input className="form-control" type="date" placeholder="Choose A Date" onChange={(event) => {
                                                setDate(event.target.value);
                                            }}/>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">SKUID</span>
                                            <input className="form-control" type="text" placeholder="Enter SKUID" onChange={(event) => {
                                                setSkuid(event.target.value);
                                            }}/>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">OrderID</span>
                                            <input className="form-control" type="text" placeholder="Enter Order ID" onChange={(event) => {
                                                setOrderid(event.target.value);
                                            }}/>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Product Name</span>
                                            <input className="form-control" type="text" placeholder="Enter Product Name" onChange={(event) => {
                                                setProductName(event.target.value);
                                            }}/>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Origin</span>
                                            <input className="form-control" type="text" placeholder="Enter Origin" onChange={(event) => {
                                                setOrigin(event.target.value);
                                            }}/>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Price USD($)</span>
                                            <input className="form-control" type="number" placeholder="Enter Price in USD($)" onChange={(event) => {
                                                setPrice(event.target.value);
                                            }}/>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Store 1 Order</span>
                                            <input className="form-control" type="number" placeholder="Enter Store 1 Order" onChange={(event) => {
                                                setStore1(event.target.valueAsNumber);
                                            }}/>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Store 2 Order</span>
                                            <input className="form-control" type="number" placeholder="Enter Store 2 Order" onChange={(event) => {
                                                setStore2(event.target.valueAsNumber);
                                            }}/>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Store 3 Order</span>
                                            <input className="form-control" type="number" placeholder="Enter Store 3 Order" onChange={(event) => {
                                                setStore3(event.target.valueAsNumber);
                                            }}/>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" onClick={addOrder}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}
 
export default Home;