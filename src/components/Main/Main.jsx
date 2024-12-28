import { useState, useEffect } from "react";
import {
    RegisterUser,
    RegisterIDCard,
    RegisterCar,
    SendPenalty,
    PayPenalty,
    ExtensionIDCard,
    UpdateStatusUser,
    GetAllUser,
    GetAllNumberCar,
    GetBalanceBank,
} from "../../Services/funcServices";
import "./Main.css";

const DataMain = ({ dataUser, wallet }) => {
    const [newData, setNewData] = useState({ wallet });

    useEffect(() => {
        setNewData((prevData) => ({
            ...prevData,
            wallet,
        }));
    }, [wallet]);

    function handleInputObj(e, label) {
        setNewData({
            ...newData,
            [label]: e.target.value,
        });
    }

    return (
        <div className="container-data">
            <h3>User</h3>
            {dataUser.name ? (
                <div className="data-display">
                    <div>Name: {dataUser.name}</div>
                    <div>Surname: {dataUser.surname}</div>
                    <div>Patronymic: {dataUser.patronymic}</div>
                    <div>YearBeginDriving: {parseInt(dataUser.yearBeginDriving)}</div>
                    <div>Penalty: {parseInt(dataUser.penalty)}</div>
                    <div>ProfiCoin: {parseInt(dataUser.ProfiCoin)}</div>
                    <div>Status: {dataUser.status}</div>
                </div>
            ) : (
                <div>
                    <input
                        onChange={(e) => handleInputObj(e, "name")}
                        placeholder="Name"
                        type="text"
                    />
                    <input
                        onChange={(e) => handleInputObj(e, "surname")}
                        placeholder="Surname"
                        type="text"
                    />
                    <input
                        onChange={(e) => handleInputObj(e, "patronymic")}
                        placeholder="Patronymic"
                        type="text"
                    />
                    <input
                        onChange={(e) => handleInputObj(e, "yearBeginDriving")}
                        placeholder="Year begin driving"
                        type="number"
                    />
                    <button onClick={() => RegisterUser(newData)}>Send data</button>
                </div>
            )}
        </div>
    );
};

const DataIdCard = ({ dataIdCard, wallet }) => {
    const [newData, setNewData] = useState({ wallet });

    useEffect(() => {
        setNewData((prevData) => ({
            ...prevData,
            wallet,
        }));
    }, [wallet]);

    function handleInputObj(e, label) {
        setNewData({
            ...newData,
            [label]: e.target.value,
        });
    }

    return (
        <div className="container-data">
            <h3>ID Card</h3>
            {dataIdCard.number ? (
                <div className="data-display">
                    <div>Number: {dataIdCard.number}</div>
                    <div>Validity period: {parseInt(dataIdCard.validityPeriod)}</div>
                    <div>Category: {dataIdCard.category}</div>
                    <button onClick={() => ExtensionIDCard({ wallet: wallet })}>Extension ID Card</button>
                </div>
            ) : (
                <div>
                    <input
                        onChange={(e) => handleInputObj(e, "number")}
                        placeholder="Number" type="text" />
                    <input
                        onChange={(e) => handleInputObj(e, "validityPeriod")}
                        placeholder="Validity period" type="number" />
                    <input
                        onChange={(e) => handleInputObj(e, "category")}
                        placeholder="Category" type="text" />
                    <button onClick={() => RegisterIDCard(newData)}>Send data</button>
                </div>
            )}
        </div>
    );
};

const DataCar = ({ dataCar, wallet }) => {
    const [newData, setNewData] = useState({ wallet });

    useEffect(() => {
        setNewData((prevData) => ({
            ...prevData,
            wallet,
        }));
    }, [wallet]);

    function handleInputObj(e, label) {
        setNewData({
            ...newData,
            [label]: e.target.value,
        });
    }

    return (
        <div className="container-data">
            <h3>Car</h3>
            {dataCar.category ? (
                <div className="data-display">
                    <div>Category: {dataCar.category}</div>
                    <div>Price: {parseInt(dataCar.price)}</div>
                    <div>Service life: {parseInt(dataCar.serviceLife)}</div>
                </div>
            ) : (
                <div>
                    <input
                        onChange={(e) => handleInputObj(e, "category")}
                        placeholder="Category" type="text" />
                    <input
                        onChange={(e) => handleInputObj(e, "price")}
                        placeholder="Price" type="number" />
                    <input
                        onChange={(e) => handleInputObj(e, "serviceLife")}
                        placeholder="Service life" type="text" />
                    <button onClick={() => RegisterCar(newData)}>Send data</button>
                </div>
            )}
        </div>
    );
};

const DataPenalty = ({ dataPenalty, wallet }) => {
    const [newData, setNewData] = useState({ wallet });

    useEffect(() => {
        setNewData((prevData) => ({
            ...prevData,
            wallet,
        }));
    }, [wallet]);

    return (
        <div className="container-data">
            <h3>Penalty</h3>
            {dataPenalty.length > 0 ? (
                <div className="data-display">
                    {dataPenalty.map(penalty => {
                        const timestep = parseInt(penalty.timePenalty);
                        const date = new Date(timestep * 1000);
                        const formattedDate = date.toLocaleDateString();
                        const formattedTime = date.toLocaleTimeString();
                        return (
                            <>
                                <div>Время {`${formattedDate} ${formattedTime}`}</div>
                            </>
                        )
                    })}
                    <button onClick={() => PayPenalty(newData)}>Pay old penalty</button>
                </div>
            ) : (
                <div>Нет штрафов</div>
            )}
        </div>
    );
};

const SendPenaltyModal = ({ wallet }) => {
    const [newData, setNewData] = useState({ wallet });

    useEffect(() => {
        setNewData((prevData) => ({
            ...prevData,
            wallet,
        }));
    }, [wallet]);

    function handleInputObj(e, label) {
        setNewData({
            ...newData,
            [label]: e.target.value,
        });
    }

    return (
        <div className="container-data">
            <h3>Send Penalty</h3>
            <div>
                <input
                    onChange={(e) => handleInputObj(e, "number")}
                    placeholder="Number Car" type="text" />
                <button onClick={() => SendPenalty(newData)}>Send penalty</button>
            </div>
        </div>
    );
};

const UpdateUserStatus = ({ wallet }) => {
    const [newData, setNewData] = useState({ wallet });

    useEffect(() => {
        setNewData((prevData) => ({
            ...prevData,
            wallet,
        }));
    }, [wallet]);

    function handleInputObj(e, label) {
        setNewData({
            ...newData,
            [label]: e.target.value,
        });
    }

    return (
        <div className="container-data">
            <h3>Update User Status</h3>
            <div>
                <input
                    onChange={(e) => handleInputObj(e, "to")}
                    placeholder="Address wallet" type="text" />
                <button onClick={() => UpdateStatusUser(newData)}>Update User Status</button>
            </div>
        </div>
    );
}

const DataAllUser = ({ wallet }) => {
    const [allUser, setAllUser] = useState([]);

    function ShortWallet(walletUser) {
        return walletUser.slice(0, 6) + "..." + walletUser.slice(walletUser.length - 5);
    }

    return (
        <div className="container-data">
            <h3>All user</h3>
            <div className="data-display">
                <button onClick={async () => {
                    const addressAllUser = await GetAllUser(wallet);
                    setAllUser(addressAllUser)
                }}
                >Get All User</button>
                {allUser && allUser.map((wlt) => (
                    <div
                        key={wlt}
                        onClick={() => {
                            navigator.clipboard.writeText(wlt);
                            alert(`The wallet "${wlt}" was copied`);
                        }}
                    >
                        {ShortWallet(wlt)}
                    </div>
                ))}
            </div>
        </div>
    );
};

const DataAllNumberCar = ({ wallet }) => {
    const [allNumberCar, setAllNumberCar] = useState([]);

    return (
        <div className="container-data">
            <h3>All Number Car</h3>
            <div className="data-display">
                <button onClick={async () => {
                    const addressAllUser = await GetAllNumberCar(wallet);
                    setAllNumberCar(addressAllUser)
                }}
                >Get Number Car</button>
                {allNumberCar && allNumberCar.map((numberCat) => (
                    <div
                        key={numberCat}
                        onClick={() => {
                            navigator.clipboard.writeText(numberCat);
                            alert(`The number car "${numberCat}" was copied`);
                        }}
                    >
                        {numberCat}
                    </div>
                ))}
            </div>
        </div>
    );
};

const GetBalanceBankModal = ({ wallet }) => {
    const [balanceBank, setBalanceBank] = useState(0);

    return (
        <div className="container-data">
            <h3>Get Balance Bank</h3>
            <div className="data-display">
                <button onClick={async () => {
                    const balance = await GetBalanceBank(wallet);
                    setBalanceBank(parseInt(balance))
                }}
                >Get All User</button>
                <div>ProfiCoin: {balanceBank}</div>
            </div>
        </div>
    );
}

const Main = ({ data, wallet }) => {
    const [dataUser, setDataUser] = useState({});
    const [dataIdCard, setDataIdCard] = useState({});
    const [dataCar, setDataCar] = useState({});
    const [dataPenalty, setDataPenalty] = useState([]);

    useEffect(() => {
        setDataUser(data?.user || {});
        setDataIdCard(data?.idcard || {});
        setDataCar(data?.car || {});
        setDataPenalty(data?.penalty || []);
    }, [data]);

    return (
        <div className="main-container">
            {/* For all user */}
            {(dataUser || dataUser.status == "driver" || dataUser.status == "") &&
                <>
                    <DataMain dataUser={dataUser} wallet={wallet} />
                    <DataIdCard dataIdCard={dataIdCard} wallet={wallet} />
                    <DataCar dataCar={dataCar} wallet={wallet} />
                    <DataPenalty dataPenalty={dataPenalty} wallet={wallet} />
                </>
            }


            <UpdateUserStatus wallet={wallet} />
            {/* For DPS or Bank*/}
            {(dataUser.status == "DPS") &&
                <>
                    <SendPenaltyModal wallet={wallet} />
                    <DataAllUser wallet={wallet} />
                    <DataAllNumberCar wallet={wallet} />
                    {/* For Bank */}
                    <GetBalanceBankModal wallet={wallet} />
                </>
            }

        </div>
    );
};

export default Main;