import pandas as pd
import json

# Lire le fichier Excel
df = pd.read_excel('liste-envies.xlsx', engine='openpyxl')

# Nettoyer les lignes vides
df = df.dropna(how='all')

# Convertir en JSON
json_data = df.to_dict(orient='records')

# Sauvegarder le JSON
with open('wishlist.json', 'w') as f:
    json.dump(json_data, f, indent=4)
