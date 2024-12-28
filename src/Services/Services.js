import Web3 from "web3";
import abi from "./abi.json"

class Services {
    web3 = new Web3(window.ethereum);
    contractAddress = "0xd5EBa249c1342FA4ed24CbAEa4cc8209d4020773"
    contractFactory = new this.web3.eth.Contract(abi, this.contractAddress);

    // Регистрация пользователя
    async RegisterUser(obj) {
        if (!obj.wallet) {
            console.log("The wallet is not connect")
            return
        }

        try {
            await this.contractFactory.methods
                .registerUser(obj.name, obj.surname, obj.patronymic, obj.yearBeginDriving)
                .send({ from: obj.wallet })
            return true
        } catch (err) {
            console.log("Error Register User: ", err)
            return false
        }
    }

    // Регистрация удостверения
    async RegisterIDCard(obj) {
        if (!obj.wallet) {
            console.log("The wallet is not connect")
            return
        }

        try {
            await this.contractFactory.methods
                .registerIDCard(obj.number, obj.validityPeriod, obj.category)
                .send({ from: obj.wallet })
            return true
        } catch (err) {
            console.log("Error Register ID Card: ", err)
            return false
        }
    }

    // Регистрация машины
    async RegisterCar(obj) {
        if (!obj.wallet) {
            console.log("The wallet is not connect")
            return
        }

        try {
            await this.contractFactory.methods
                .registerCar(obj.category, obj.price, obj.serviceLife)
                .send({ from: obj.wallet })
            return true
        } catch (err) {
            console.log("Error Register Car: ", err)
            return false
        }
    }

    // Отпрака штрафов
    async SendPenalty(obj) {
        if (!obj.wallet) {
            console.log("The wallet is not connect")
            return
        }

        try {
            await this.contractFactory.methods
                .sendPenalty(obj.number)
                .send({ from: obj.wallet })
            return true
        } catch (err) {
            console.log("Error Send Penalty:", err)
            return false
        }
    }

    // Оплата штарфов
    async PayPenalty(obj) {
        if (!obj.wallet) {
            console.log("The wallet is not connect")
            return
        }

        try {
            await this.contractFactory.methods
                .payPenalty()
                .send({ from: obj.wallet })
            return true
        } catch (err) {
            console.log("Error Pay Penalty:", err)
            return false
        }
    }

    // Проделение удостоверения
    async ExtensionIDCard(obj) {
        if (!obj.wallet) {
            console.log("The wallet is not connect")
            return
        }

        try {
            await this.contractFactory.methods
                .extensionIDCard()
                .send({ from: obj.wallet })
            return true
        } catch (err) {
            console.log("Error Extension ID Card:", err)
            return false
        }
    }

    // Получение данных пользователя самим пользователем
    async GetDataUser(wallet) {
        if (!wallet) {
            console.log("The wallet is not connect")
            return
        }

        try {
            return await this.contractFactory.methods
                .getDataUser()
                .call({ from: wallet })
        } catch (err) {
            console.log("Error Get Data User:", err)
        }
    }

    // Получение данных пользовтаеля по его кошельку только для ДНС и Банка.
    async GetDataUserByAddress(obj) {
        if (!obj.wallet) {
            console.log("The wallet is not connect")
            return
        }

        try {
            return await this.contractFactory.methods
                .getDataUserByAddress(obj.to)
                .call()
        } catch (err) {
            console.log("Error Get Data User By Address:", err)
        }
    }

    // Поднятие статуса у пользователя 
    async UpdateStatusUser(obj) {
        if (!obj.wallet) {
            console.log("The wallet is not connect")
            return
        }

        try {
            await this.contractFactory.methods
                .updateStatusUser(obj.to)
                .send({ from: obj.wallet })
            return true
        } catch (err) {
            console.log("Error Update Status User:", err)
            return false
        }
    }

    // Вывод всех адресов пользователей 
    async GetAllUser(wallet) {
        if (!wallet) {
            console.log("The wallet is not connect")
            return
        }

        try {
            return await this.contractFactory.methods
                .getAllUser()
                .call({ from: wallet })
        } catch (err) {
            console.log("Error Get All User:", err)
        }
    }

    // Вывести все номера машины 
    async GetAllNumberCar(wallet) {
        if (!wallet) {
            console.log("The wallet is not connect")
            return
        }

        try {
            return await this.contractFactory.methods
                .getAllNumberCar()
                .call({ from: wallet })
        } catch (err) {
            console.log("Error Get All Number Car:", err)
        }
    }

    async GetBalanceBank(wallet) {
        if (!wallet) {
            console.log("The wallet is not connect")
            return
        }

        try {
            return await this.contractFactory.methods.GetBalanceBank().call({ from: wallet })
        } catch (err) {
            console.log("Error Get Balance Bank:", err)
        }
    }
}

export default new Services()