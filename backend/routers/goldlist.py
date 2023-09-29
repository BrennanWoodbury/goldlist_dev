from fastapi import APIRouter
from db_engine import mssql
from config import env
from uuid import UUID

router = APIRouter()


@router.get("/items")
def return_items():
    d = mssql.Db_Cursor(
        server=env["MSSQL_SERVER"],
        database="EpicorEWHApplication",
        user=env["MSSQL_USER"],
        password=env["MSSQL_PASSWORD"],
    )
    q = d.query(
        """
    SELECT a.AssetNumber as Name, 
        a.ComputerName as Hostname, 
        d.GroupID as [Group],
        a.ProductDescription as [Description],
        c.ShortGroupName as GroupName,
        b.NetworkAddress as IPAddress,
        a.ProductID,
        a.OrganizationID


    FROM EpicorEWHApplication.dbo.rptProductDetail AS a
    JOIN [EpicorEWHApplication].[dbo].[ProductDetailsList_EWH] AS b ON a.ProductID = b.ProductID
    JOIN EpicorEWHApplication.dbo.Product AS d ON a.ProductID = d.ProductID
    FULL JOIN EpicorEWHApplication.dbo.GroupsList AS c ON d.GroupID = c.GroupID
    WHERE a.OrganizationID like '24EA2C79-ACDE-4EF1-9058-93764AE92A0E'
    AND a.ParentProductID like 'BF2EEDC2-47CF-423D-BE04-40342D20AE4B'
    """
    )

    return q
    # return {"Test": "Testing"}


@router.get("/children/{item_id}")
def return_children(item_id: UUID):
    d = mssql.Db_Cursor(
        server=env["MSSQL_SERVER"],
        database="EpicorEWHApplication",
        user=env["MSSQL_USER"],
        password=env["MSSQL_PASSWORD"],
    )
    q = d.query(
        f"""
    select top 100 * from epicorewhapplication.dbo.rptProductDetail
    where OwnerOrganizationName like 'Databank - Tools Team'
    and ParentProductID = '{item_id}'
	and ProductStatusName like 'Operational'
    """
    )

    return q
