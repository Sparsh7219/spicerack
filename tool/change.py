import json

def update_ingredients(json_data):
    for item in json_data:
        if 'ingredients' in item:
            item['ingredients'] = [ingredient.replace('pasta shells', 'pasta') for ingredient in item['ingredients']]
    return json_data

# Read the JSON file
file_path = "recipes.json"  # Replace with your actual file path
with open(r'tool\recipes.json', 'r',encoding='utf-8') as f:
    data = json.load(f)

# Update the ingredients
updated_data = update_ingredients(data)

# Write the updated data back to the JSON file
with open(r'tool\recipes.json', 'w',encoding='utf-8') as f:
    json.dump(updated_data, f, indent=2)

print("Ingredients updated successfully.")
