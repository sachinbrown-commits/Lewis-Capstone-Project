USE [LewisStoresDb];
GO

SELECT Id, Title, StockQuantity, Price FROM Products
WHERE StockQuantity = 25;

SELECT * FROM Orders;

SELECT Id, OrderId, Reason, Status, RequestedAmount
FROM [ReturnRequests]
WHERE Id = 4;

SELECT * FROM Products;

SELECT * FROM [ReturnRequests];