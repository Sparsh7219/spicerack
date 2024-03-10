import json

def update_ingredients(json_data):
    for item in json_data:
        if 'ingredients' in item:
            item['ingredients'] = [ingredient.replace('cheddar cheese blend', 'cheddar cheese') for ingredient in item['ingredients']]
    return json_data

# Read the JSON file
file_path = "recipes.json"  # Replace with your actual file path
with open(file_path, 'r') as file:
    data = json.load(file)

# Update the ingredients
updated_data = update_ingredients(data)

# Write the updated data back to the JSON file
with open(file_path, 'w') as file:
    json.dump(updated_data, file, indent=2)

print("Ingredients updated successfully.")
