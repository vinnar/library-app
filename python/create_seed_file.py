import json
from pathlib import Path

INPUT_FILE = "./../tmp/books_inventory.json"
OUTPUT_FILE = "./../src/app/static/seed_book_data.json"

def extract_fields(data):
    extracted = []
    for entry in data:
        extracted.append({
            "loc_id": entry.get("id", []),
            "authors": entry.get("contributor", []),
            "description": entry.get("description", []),
            "call_number": entry.get("item", {}).get("call_number", []),
            "date": entry.get("date", ""),
            "title": entry.get("title", ""),
            "tags": entry.get("subject", [])
        })
    return extracted

def main():
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        raw_data = json.load(f)

    filtered_data = extract_fields(raw_data)

    Path(OUTPUT_FILE).parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(filtered_data, f, indent=4)
    
    print(f"Seeding data written to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
