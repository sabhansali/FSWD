from pymongo import MongoClient 
import psycopg2 
mongo_client = MongoClient("mongodb://localhost:27017/") 
mongo_db = mongo_client["University"] 
mongo_students = mongo_db["students"] 
pg_conn = psycopg2.connect( 
    dbname="University", 
    user="postgres", 
    password="student123@", 
    host="localhost", 
    port="5432" 
) 
pg_cursor = pg_conn.cursor() 
students_data = mongo_students.find() 
for student in students_data: 
    name = student.get("name", "").strip().title() 
    age = int(student.get("age", 0)) 
    email = student.get("email", "").lower() 
    try: 
        pg_cursor.execute(""" 
            INSERT INTO students (name, age, email) 
            VALUES (%s, %s, %s) 
            ON CONFLICT (email) DO NOTHING; 
            """, (name, age, email)) 
    except Exception as e: 
        print(f"Error inserting {name}: {e}") 
pg_conn.commit() 
pg_cursor.close() 
pg_conn.close() 
mongo_client.close()