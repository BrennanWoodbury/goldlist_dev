import psycopg2


class Db_Cursor:
    def __init__(self, host, dbname, user, password, port):
        self.host = host
        self.dbname = dbname
        self.user = user
        self.password = password
        self.port = port

    def open_context(self):
        self.conn = psycopg2.connect(
            dbname="bcs_testing",
            user=self.user,
            password=self.password,
            host=self.host,
            port=self.port,
        )
        self.cur = self.conn.cursor()

    def close_context(self):
        self.cur.close()
        self.conn.close()

    def sql(self, sql: str):
        self.open_context()
        self.cur.execute(sql)
        response = self.cur.fetchall()
        self.close_context()
        return response


# class Db_Cursor:
#     def __init__(self, host, dbname, user, password):
#         self.host = host
#         self.dbname = dbname
#         self.user = user
#         self.password = password

#     def __enter__(self):
#         self.conn = psycopg2.connect(
#             host=self.host,
#             dbname=self.database,
#             user=self.user,
#             password=self.password,
#         )
#         self.cur = self.conn.cursor()
#         return self.conn

#     def __exit__(self, exc_type, exc_value, traceback):
#         self.conn.close()
#         self.cur.close()

#     def open_context(self):
#         self.conn = psycopg2.connect(
#             host=self.host,
#             dbname=self.database,
#             user=self.user,
#             password=self.password,
#             cursor_factory=psycopg2.extras.DictCursor,
#         )
#         self.cur = self.conn.cursor()

#     def close_context(self):
#         self.cur.close()
#         self.conn.close()

#     def query(self, query: str):
#         self.open_context()
#         self.cur.execute(query)
#         response = self.cur.fetchall()
#         self.close_context()
#         return response

#     def sql(self, sql: str):
#         self.open_context()
#         self.cur.execute(sql)
#         response = self.cur.fetchall()
#         self.close_context()
#         return response
