// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;


contract MyStruct {
    struct Car {
        string model;
        uint year;
        address owner;
    }

    Car public car;
    Car[] public cars;
    mapping(address => Cars) public carsByOwner;

    function example() external {
        // memory 表示只存在内存中，执行完之后就回收, 只读不能修改，想要修改要用 storage
        Car memory toyota = Car('Toyota', 1990, msg.sender);
        Car memory tesla = Car({model: 'Tesla', year: 2000, owner: msg.sender});

        cars.push(toyota);
        cars.push(tesla);

        // storage 可修改
        Car storage _car = cars[0];
        _car.year = 1980;
    }

}