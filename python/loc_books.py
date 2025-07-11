import requests
import time
import json
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

all_books = []
iteration_count=200
books_count=25
inventory_file_path='./../tmp/books_inventory-test.json'
count=0
file_batch=20
sleep_timer=15

def get_session_with_retries(retries=5, backoff_factor=1, status_forcelist=(500, 502, 504)):
    session = requests.Session()
    retry = Retry(
        total=retries,
        read=retries,
        connect=retries,
        backoff_factor=backoff_factor,
        status_forcelist=status_forcelist,
        raise_on_status=False,
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('https://', adapter)
    return session

session = get_session_with_retries()

with open(inventory_file_path, "w") as file:
    for page_number in range(1, iteration_count+1):
        # url = f"https://www.loc.gov/books/?fo=json&c={books_count}&sp={page_number}"
        url = f"https://www.loc.gov/books/?all=true&dates=2000/2026&fa=language:english|subject:fiction|subject:mystery+fiction&fo=json&c={books_count}&sp={page_number}"
        print(f"Requesting data for {books_count} and iteration {page_number}")

        try:
            response = session.get(url, timeout=(5, 30))
            response.raise_for_status()
            data = response.json()
            all_books.extend(data.get('results', []))
        except requests.exceptions.RequestException as e:
            print(f"Failed to fetch page {page_number}: {e}")
            continue

        json.dump(all_books, file, indent=4)
        file.write('\n')
        time.sleep(sleep_timer)
        count += 1

    # if (count % file_batch == 0 ):
    #     file.write(all_books)
    #     all_books.clear()
    # json.dump(all_books, file, indent=4)

print(f"Retrieved {len(all_books)} books")

# Example search string - English lang books published between 2000-2026 that are Fiction, specializing in Mystery Fiction
# https://www.loc.gov/books/?all=true&dates=2000/2026&fa=language:english%7Csubject:fiction%7Csubject:mystery+fiction