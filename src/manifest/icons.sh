# Run command to update manifest file(icons.json) : npm run manifest

# Note :  After running the script, you may need to make some manual adjustments to the output file based on UX specifications for certain icons
#   Adjust 'name' field for the icons with uppercase letters in the filename.
#   Adjust 'category' field
#   Adjust 'duotone'  field

#!/bin/bash

testlist="updated-icons.txt"  # Input file : Update this file with the list of newly added icons. Note: File should end with an empty line.
manifest_file="icons.json"  # Output file

new_elements_array="[]"

# Loop through each line in the testlist file
while IFS= read -r file; do
    # Check if the file variable is not empty
    if [ -n "$file" ]; then
        # Transform the file name to create the friendly_name and icon_name
        icon_name=$(echo "$file" | tr '[:upper:]' '[:lower:]')  # Converts icon file name to lowercase.
        friendly_name=$(echo "$file" | tr '-' ' ' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2); print}')  # Transforms the file name into a more user-friendly format by replacing hyphens with spaces and capitalizing each word.

        # Create new JSON element based on the current file name
        new_element=$(jq -n --arg name "$file" --arg friendly_name "$friendly_name" --arg icon_name "$icon_name" '{
            "name": $icon_name,
            "friendly_name": $friendly_name,
            "category": "Functional",
            "aliases": [],
            "duotone": false
        }')

        # Append the new element to the new_elements_array
        new_elements_array=$(echo "$new_elements_array" | jq --argjson new_element "$new_element" '. += [$new_element]')
    fi
done < "$testlist"

# Read existing JSON from the manifest file, default to an empty array if the file is empty
existing_json=$(cat "$manifest_file" 2>/dev/null || echo "[]")

# Combine existing JSON with new elements and sort
combined_json=$(echo "$existing_json" "$new_elements_array" | jq -s 'add | sort_by(.name)')

# Write the updated JSON back to the manifest file
echo "$combined_json" > "$manifest_file"


