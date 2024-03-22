import json

def add_ids_to_json_file(json_file, start_id):
    # Read JSON file
    with open(r'tool\vegetarian.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Add id starting from the specified start_id
    for i, obj in enumerate(data):
        obj_with_id = {'id': start_id + i}  # Adding IDs starting from start_id
        obj_with_id.update(obj)  # Merge the original object with the id field added
        data[i] = obj_with_id  # Replace the original object with the new one

    # Write the updated JSON back to the file
    with open(json_file, 'w') as f:
        json.dump(data, f, indent=4)

# Example usage:
if __name__ == "__main__":
    json_file = 'vegetarian.json'  # Change this to your JSON file path
    start_id = 3536
    add_ids_to_json_file(json_file, start_id)
