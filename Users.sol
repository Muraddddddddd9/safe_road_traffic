// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Users {
    // Структуры банка
    struct Bank {
        uint256 ProfiCoin;
    }

    // Структура пользователя
    struct User {
        string name;
        string surname;
        string patronymic;
        uint256 yearBeginDriving;
        uint64 penalty;
        uint256 ProfiCoin;
        string status;
    }

    // Структура водительского удостоверения
    struct IDCard {
        string number;
        uint256 validityPeriod;
        string category;
    }

    // Структура машины
    struct Car {
        string category;
        uint256 price;
        uint256 serviceLife;
    }

    // Структура штарфов
    struct Penalty {
        uint256 timePenalty;
    }

    // Адрес создателя(Банк)
    address public _Bank;

    // Маппинг и массив с пользователями
    mapping(address => User) private userMapping;
    address[] private userArray;
    // Маппинг с банком
    mapping(address => Bank) private bankMapping;

    // Маппинг с удостоверением и массив номеров машин
    mapping(address => IDCard) private idCardMapping;
    string[] private numberCarArray;

    // Маппинг машин
    mapping(address => Car) private carMapping;
    // Маппинг-массивов штарфов
    mapping(address => Penalty[]) private penaltyMapping;

    // Структура при создании контракта
    constructor() {
        _Bank = msg.sender;
        bankMapping[msg.sender] = Bank({ProfiCoin: 1000});
    }

    // Модификатор для того чтобы фугкция использовалось только Банком
    modifier onlyBank() {
        require(msg.sender == _Bank, "This is only for the bank");
        _;
    }

    // Модификатор для того чтобы фугкция использовалось только сотрудником ДПС
    modifier onlyDPS() {
        require(
            keccak256(bytes(userMapping[msg.sender].status)) ==
                keccak256(bytes("DPS")),
            "This is only for the DPS"
        );
        _;
    }

    // Модификатор для того чтобы фугкция использовалось только Банком или сотрудником ДПС
    modifier onlyBankOrDPS() {
        require(
            msg.sender == _Bank ||
                keccak256(bytes(userMapping[msg.sender].status)) ==
                keccak256(bytes("DPS")),
            "This is only for the DPS or Bank"
        );
        _;
    }

    // Регистрация пользователя
    function registerUser(
        string memory name,
        string memory surname,
        string memory patronymic,
        uint256 yearBeginDriving
    ) external {
        require(
            bytes(userMapping[msg.sender].name).length == 0,
            "User already registered"
        );

        userMapping[msg.sender] = User({
            name: name,
            surname: surname,
            patronymic: patronymic,
            yearBeginDriving: yearBeginDriving,
            penalty: 0,
            ProfiCoin: 50,
            status: "driver"
        });

        userArray.push(msg.sender);
    }

    // Регистрация удостверения
    function registerIDCard(
        string memory number,
        uint256 validityPeriod,
        string memory category
    ) external {
        require(
            bytes(userMapping[msg.sender].name).length != 0,
            "User not found"
        );

        require(
            bytes(idCardMapping[msg.sender].number).length == 0,
            "ID Card already registered"
        );

        for (uint256 i = 0; i < numberCarArray.length; i++) {
            require(
                keccak256(bytes(numberCarArray[i])) != keccak256(bytes(number)),
                "Number must be unique"
            );
        }

        idCardMapping[msg.sender] = IDCard({
            number: number,
            validityPeriod: validityPeriod,
            category: category
        });

        numberCarArray.push(number);
    }

    // Регистрация машины
    function registerCar(
        string memory category,
        uint256 price,
        uint256 serviceLife
    ) external {
        require(
            bytes(userMapping[msg.sender].name).length != 0,
            "User not found"
        );

        require(
            keccak256(bytes(idCardMapping[msg.sender].number)).length != 0,
            "ID Card not found"
        );

        require(
            bytes(carMapping[msg.sender].category).length == 0,
            "Car already registered"
        );

        require(
            keccak256(bytes(idCardMapping[msg.sender].category)) ==
                keccak256(bytes(category)),
            "The category of the ID Card does not correspond to the transport one"
        );

        carMapping[msg.sender] = Car({
            category: category,
            price: price,
            serviceLife: serviceLife
        });
    }

    // Отпрака штрафов
    function sendPenalty(string memory number) external onlyDPS {
        address to;
        for (uint256 i = 0; i < userArray.length; i++) {
            if (
                keccak256(bytes(number)) ==
                keccak256(bytes(idCardMapping[userArray[i]].number))
            ) {
                to = userArray[i];
                break;
            }
        }

        userMapping[to].penalty += 1;
        penaltyMapping[to].push(Penalty({timePenalty: block.timestamp}));
    }

    // Оплата штарфов
    function payPenalty() external {
        require(userMapping[msg.sender].penalty > 0, "No penalties to pay");
        require(penaltyMapping[msg.sender].length > 0, "No penalties found");

        uint256 oldestIndex = 0;
        uint256 oldestTime = penaltyMapping[msg.sender][0].timePenalty;

        for (uint256 i = 1; i < penaltyMapping[msg.sender].length; i++) {
            if (penaltyMapping[msg.sender][i].timePenalty < oldestTime) {
                oldestTime = penaltyMapping[msg.sender][i].timePenalty;
                oldestIndex = i;
            }
        }

        uint256 timeElapsed = block.timestamp - oldestTime;
        uint256 fee = timeElapsed <= 5 minutes ? 5 : 10;

        require(
            userMapping[msg.sender].ProfiCoin >= fee,
            "Insufficient ProfiCoin to pay the penalty"
        );

        userMapping[msg.sender].ProfiCoin -= fee;
        userMapping[msg.sender].penalty -= 1;
        bankMapping[_Bank].ProfiCoin += fee;

        penaltyMapping[msg.sender][oldestIndex] = penaltyMapping[msg.sender][
            penaltyMapping[msg.sender].length - 1
        ];
        penaltyMapping[msg.sender].pop();
    }

    // Проделение удостоверения
    function extensionIDCard() external {
        require(
            keccak256(bytes(idCardMapping[msg.sender].number)).length != 0,
            "ID Card not found"
        );

        require(
            idCardMapping[msg.sender].validityPeriod >= block.timestamp &&
                idCardMapping[msg.sender].validityPeriod <=
                block.timestamp + 30 days,
            "Your ID card is invalid"
        );

        require(
            userMapping[msg.sender].penalty == 0,
            "You need to pay a penalty"
        );

        idCardMapping[msg.sender].validityPeriod =
            block.timestamp +
            (10 * 365 * 24 * 60 * 60);
    }

    // Получение данных пользователя самим пользователем
    function getDataUser()
        external
        view
        returns (
            User memory user,
            IDCard memory idcard,
            Car memory car,
            Penalty[] memory penalty
        )
    {
        user = userMapping[msg.sender];
        idcard = idCardMapping[msg.sender];
        car = carMapping[msg.sender];
        penalty = penaltyMapping[msg.sender];
    }

    // Получение данных пользовтаеля по его кошельку только для ДНС и Банка.
    function getDataUserByAddress(address to)
        external
        view
        onlyBankOrDPS
        returns (
            User memory user,
            IDCard memory idcard,
            Car memory car,
            Penalty[] memory penalty
        )
    {
        user = userMapping[to];
        idcard = idCardMapping[to];
        car = carMapping[to];
        penalty = penaltyMapping[to];
    }

    // Поднятие статуса у пользователя
    function updateStatusUser(address to) external onlyBankOrDPS {
        userMapping[to].status = "DPS";
    }

    // Вывод всех адресов пользователей
    function getAllUser()
        external
        view
        onlyBankOrDPS
        returns (address[] memory)
    {
        return userArray;
    }

    // Вывести все номера машины
    function getAllNumberCar()
        external
        view
        onlyBankOrDPS
        returns (string[] memory)
    {
        return numberCarArray;
    }

    function GetBalanceBank()
        external
        view
        onlyBank
        returns (uint256 ProfiCoin)
    {
        return (ProfiCoin = bankMapping[msg.sender].ProfiCoin);
    }
}