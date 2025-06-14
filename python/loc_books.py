import requests
import time
import json

all_books = []
iteration_count=200
books_count=25
inventory_file_path='./../tmp/books_inventory.json'
count=0
file_batch=20
sleep_timer=15

with open(inventory_file_path, "w") as file:
    for page_number in range(80, iteration_count):
        url = f"https://www.loc.gov/books/?fo=json&c={books_count}&sp={page_number}"
        response = requests.get(url)
        print(f"Requesting data for {books_count} and iteration {page_number}")
        if response.ok:
            data = response.json()
            all_books.extend(data.get('results', []))
            json.dump(data.get('results', []), file, indent=4)
            file.write('\n')
            time.sleep(sleep_timer)
            count += 1
        else:
            print(f"Request failed...")

    # if (count % file_batch == 0 ):
    #     file.write(all_books)
    #     all_books.clear()
    # json.dump(all_books, file, indent=4)

print(f"Retrieved {len(all_books)} books")
