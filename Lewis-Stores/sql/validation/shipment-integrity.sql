-- T-DB-SHP-001
SELECT
    o.[Id]          AS OrderId,
    o.[Status]      AS OrderStatus,
    o.[UserId],
    o.[Total],
    d.[Id]          AS DeliveryId
FROM
    [Orders] AS o
LEFT JOIN
    [Deliveries] d ON d.[OrderId] = o.[Id]
WHERE
    o.[Status] NOT IN ('Cancelled', 'Pending') 
    AND d.[Id] IS NULL;                          

-- T-DB-SHP-002
SELECT
    [TrackingNumber],
    COUNT(*)        AS OccurrenceCount,
    STRING_AGG([OrderId], ', ') AS AffectedOrderIds
FROM
    [Deliveries]
WHERE
    [TrackingNumber] IS NOT NULL
    AND [TrackingNumber] != ''
GROUP BY
    [TrackingNumber]
HAVING
    COUNT(*) > 1;

-- T-DB-SHP-003
SELECT
    [Id]            AS DeliveryId,
    [OrderId],
    [Status],
    [ShippedAtUtc],
    [DeliveredAtUtc],
    CASE
        WHEN [Status] = 'Shipped'
             AND [ShippedAtUtc] IS NULL
            THEN 'FAIL: Status is Shipped but ShippedAtUtc is NULL'
        WHEN [Status] = 'Delivered'
             AND [ShippedAtUtc] IS NULL
            THEN 'FAIL: Status is Delivered but ShippedAtUtc is NULL'
        WHEN [Status] = 'Delivered'
             AND [DeliveredAtUtc] IS NULL
            THEN 'FAIL: Status is Delivered but DeliveredAtUtc is NULL'
        WHEN [Status] = 'Delivered'
             AND [DeliveredAtUtc] < [ShippedAtUtc]
            THEN 'FAIL: DeliveredAtUtc is earlier than ShippedAtUtc'
    END             AS ViolationReason
FROM
    [Deliveries]
WHERE
    ([Status] = 'Shipped'   AND [ShippedAtUtc] IS NULL)
    OR
    ([Status] = 'Delivered' AND [ShippedAtUtc] IS NULL)
    OR
    ([Status] = 'Delivered' AND [DeliveredAtUtc] IS NULL)
    OR
    ([Status] = 'Delivered' AND [DeliveredAtUtc] < [ShippedAtUtc]);
GO

-- T-DB-SHP-004
SELECT
    d.[Id]              AS DeliveryId,
    d.[OrderId],
    d.[Status],
    d.[DeliveredAtUtc],
    d.[CurrentLocation],
    o.[UserId],
    CASE
        WHEN d.[DeliveredAtUtc] IS NULL
            THEN 'FAIL: DeliveredAtUtc (POD timestamp) is missing'
        WHEN d.[CurrentLocation] NOT LIKE '%Delivered%'
            THEN 'FAIL: CurrentLocation does not confirm delivery'
    END                 AS ViolationReason
FROM
    [Deliveries] d
INNER JOIN
    [Orders] o ON o.[Id] = d.[OrderId]
WHERE
    d.[Status] = 'Delivered'
    AND (
        d.[DeliveredAtUtc] IS NULL
        OR d.[CurrentLocation] NOT LIKE '%Delivered%'
    );