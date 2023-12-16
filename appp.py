import pandas as pd

# Baca file Excel
file_path = 'bus_route_merged.xlsx'
df = pd.read_excel(file_path)

# Misalnya, kita ingin mengisi kolom 'Angka' dengan nilai dari 1 hingga jumlah baris
df['bus_id'] = range(1, len(df) + 1)

# Simpan kembali ke file Excel
df.to_excel(file_path, index=False)