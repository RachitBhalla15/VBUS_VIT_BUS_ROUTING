import xml.etree.ElementTree as ET
import pandas as pd

# Load the GPX file
tree = ET.parse('Pudupakkam.gpx')
root = tree.getroot()

# Define a list to store coordinates
coordinates = []

# Extract lat and lng from each track point
for trkpt in root.findall('.//{http://www.topografix.com/GPX/1/1}trkpt'):
    lat = float(trkpt.get('lat'))
    lng = float(trkpt.get('lon'))
    coordinates.append({'Lat': lat, 'Lng': lng})

# Create a DataFrame from the coordinates
df = pd.DataFrame(coordinates)

# Save to Excel
df.to_excel('coordinates.xlsx', index=False)
