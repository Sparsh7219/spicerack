import json

def add_ids_to_json_file(json_file):
    # Read JSON file
    with open(r'tool\recipes.json', 'r',encoding='utf-8') as f:
        data = json.load(f)

    # Add id as the first field to each object in the JSON array
    for i, obj in enumerate(data):
        obj_with_id = {'id': i + 1}  # Adding 1-based ids
        obj_with_id.update(obj)  # Merge the original object with the id field added
        data[i] = obj_with_id  # Replace the original object with the new one

    # Write the updated JSON back to the file
    with open(json_file, 'w') as f:
        json.dump(data, f, indent=4)

# Example usage:
if __name__ == "__main__":
    json_file = 'data.json'  # Change this to your JSON file path
    add_ids_to_json_file(json_file)

    

