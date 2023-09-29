from db_engine import postgres
from db_engine import mssql
from config import env


# placeholder
org_id = "24EA2C79-ACDE-4EF1-9058-93764AE92A0E"

# TODO
# Write query that pulls in the data for the gold list
#   - Asset Number
#   - ComputerName
#   - ProductDescription
#   - NetworkAddress
#   - Group/BAN


# Take aggregated data and place it into postgres db


def get_data_from_mssql():
    mssql = mssql.Db_Cursor(
        server=env["MSSQL_SERVER"],
        database="EpicorEWHApplication",
        user=env["MSSQL_USER"],
        password=env["MSSQL_PASSWORD"],
    )
    q = mssql.query(
        f"""
    SELECT a.AssetNumber, 
        a.ComputerName, 
        d.GroupID, 
        c.ShortGroupName,
        b.NetworkAddress,
        a.ProductID,
        a.OrganizationID


    FROM EpicorEWHApplication.dbo.rptProductDetail AS a
    JOIN [EpicorEWHApplication].[dbo].[ProductDetailsList_EWH] AS b ON a.ProductID = b.ProductID
    JOIN EpicorEWHApplication.dbo.Product AS d ON a.ProductID = d.ProductID
    FULL JOIN EpicorEWHApplication.dbo.GroupsList AS c ON d.GroupID = c.GroupID
    WHERE a.OrganizationID like '{org_id}'

        """
    )
    return q


def put_data_into_postgres():
    p = postgres.Db_Cursor(
        host=env["POSTGRES_SERVER"],
        dbname="goldlist",
        user=env["POSTGRES_USER"],
        password=env["POSTGRES_PASSWORD"],
        port=env["POSTGRES_PORT"],
    )

    sql = p.sql(
        f"""
    DROP TABLE IF EXISTS goldlist.public.bcs_testing;

    CREATE TABLE goldlist.public.bcs_testing (
        AssetNumber VARCHAR(255),
        ComputerName VARCHAR(255),
        GroupID INT,
        ShortGroupName VARCHAR(255),
        NetworkAddress VARCHAR(255),
        ProductID INT,
        OrganizationID INT
    );
    """
    )


put_data_into_postgres()
