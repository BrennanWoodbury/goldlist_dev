import pymssql


class Db_Cursor:
    def __init__(self, server, database, user, password):
        self.server = server
        self.database = database
        self.user = user
        self.password = password

    def __enter__(self):
        self.conn = pymssql.connect(
            server=self.server,
            database=self.database,
            user=self.user,
            password=self.password,
        )
        self.cur = self.conn.cursor()
        return self.conn

    def __exit__(self, exc_type, exc_value, traceback):
        self.conn.close()
        self.cur.close()

    def open_context(self):
        self.conn = pymssql.connect(
            server=self.server,
            database=self.database,
            user=self.user,
            password=self.password,
            as_dict=True,
        )
        self.cur = self.conn.cursor()

    def close_context(self):
        self.cur.close()
        self.conn.close()

    def query(self, query: str):
        self.open_context()
        self.cur.execute(query)
        response = self.cur.fetchall()
        self.close_context()
        return response

    def sql(self, sql: str):
        self.open_context()
        self.cur.execute(sql)
        response = self.cur.fetchall()
        self.close_context()
        return response
