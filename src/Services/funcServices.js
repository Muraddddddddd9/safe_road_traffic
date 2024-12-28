import Services from "./Services";

// Подключение кошелька
const ConnectWallet = async () => {
    try {
        const data = await window.ethereum.request({ method: "eth_requestAccounts" });
        return data[0];
    } catch (err) {
        alert("Error connect wallet:", err);
        return null;
    }
};

// Регистрация пользователя
const RegisterUser = async (obj) => {
    if (!obj.wallet) {
        alert("The wallet is not connect")
        return
    }

    try {
        const success = await Services.RegisterUser(obj)
        if (success) {
            alert("Register User");
        } else {
            alert("No Register User");
        }
    } catch (err) {
        alert("Error RegisterUser:", err)
    }
}

// Регистрация удостверения
const RegisterIDCard = async (obj) => {
    if (!obj.wallet) {
        alert("The wallet is not connect")
        return
    }

    try {
        const success = await Services.RegisterIDCard(obj)
        if (success) {
            alert("Register ID Card");
        } else {
            alert("No Register ID Card");
        }
    } catch (err) {
        alert("Error RegisterIDCard:", err)
    }
}

// Регистрация машины
const RegisterCar = async (obj) => {
    console.log(obj)
    if (!obj.wallet) {
        alert("The wallet is not connect")
        return
    }

    try {
        const success = await Services.RegisterCar(obj)
        if (success) {
            alert("Register Car");
        } else {
            alert("No Register Car");
        }
    } catch (err) {
        alert("Error RegisterCar:", err)
    }
}

// Отпрака штрафов
const SendPenalty = async (obj) => {
    if (!obj.wallet) {
        alert("The wallet is not connect")
        return
    }

    try {
        const success = await Services.SendPenalty(obj)
        if (success) {
            alert("Send Penalty");
        } else {
            alert("No Send Penalty");
        }
    } catch (err) {
        alert("Error SendPenalty:", err)
    }
}

// Оплата штарфов
const PayPenalty = async (obj) => {
    if (!obj.wallet) {
        alert("The wallet is not connect")
        return
    }

    try {
        const success = await Services.PayPenalty(obj)
        if (success) {
            alert("Pay Penalty");
        } else {
            alert("No Pay Penalty");
        }
    } catch (err) {
        alert("Error PayPenalty:", err)
    }
}

// Проделение удостоверения
const ExtensionIDCard = async (obj) => {
    if (!obj.wallet) {
        alert("The wallet is not connect")
        return
    }

    try {
        const success = await Services.ExtensionIDCard(obj)
        if (success) {
            alert("Extension ID Card");
        } else {
            alert("No Extension ID Card");
        }
    } catch (err) {
        alert("Error ExtensionIDCard:", err)
    }
}

// Получение данных пользователя самим пользователем
const GetDataUser = async (wallet) => {
    if (!wallet) {
        alert("The wallet is not connect")
        return
    }

    try {
        return await Services.GetDataUser(wallet)
    } catch (err) {
        alert("Error GetDataUser:", err)
    }
}

// Получение данных пользовтаеля по его кошельку только для ДНС и Банка.
const GetDataUserByAddress = async (obj) => {
    if (!obj.wallet) {
        alert("The wallet is not connect")
        return
    }

    try {
        return await Services.GetDataUserByAddress(obj)
    } catch (err) {
        alert("Error GetDataUserByAddress:", err)
    }
}

// Поднятие статуса у пользователя 
const UpdateStatusUser = async (obj) => {
    if (!obj.wallet) {
        alert("The wallet is not connect")
        return
    }

    try {
        return await Services.UpdateStatusUser(obj)
    } catch (err) {
        alert("Error UpdateStatusUser:", err)
    }
}

// Вывод всех адресов пользователей 
const GetAllUser = async (wallet) => {
    if (!wallet) {
        alert("The wallet is not connect")
        return
    }

    try {
        return await Services.GetAllUser(wallet)
    } catch (err) {
        alert("Error GetAllUser:", err)
    }
}

// Вывести все номера машины 
const GetAllNumberCar = async (wallet) => {
    if (!wallet) {
        alert("The wallet is not connect")
        return
    }

    try {
        return await Services.GetAllNumberCar(wallet)
    } catch (err) {
        alert("Error GetAllNumberCar:", err)
    }
}

const GetBalanceBank = async (wallet) => {
    if (!wallet) {
        alert("The wallet is not connect")
        return
    }

    try {
        return await Services.GetBalanceBank(wallet)
    } catch (err) {
        alert("Error Get Balance Bank:", err)
    }
}

export {
    ConnectWallet,
    RegisterUser,
    RegisterIDCard,
    RegisterCar,
    SendPenalty,
    PayPenalty,
    ExtensionIDCard,
    GetDataUser,
    GetDataUserByAddress,
    UpdateStatusUser,
    GetAllUser,
    GetAllNumberCar,
    GetBalanceBank
}