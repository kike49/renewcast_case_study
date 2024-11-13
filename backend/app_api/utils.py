# External imports
import os
import pandas as pd

# Django imports
from django.conf import settings


def load_wind_data(file_name: str, col_names: list) -> pd.Series:
    """
    Load and process wind data from CSV file.

    Args:
        file_name (str): name of the CSV file to convert to pandas
        col_names (list): list of column names to read
    Returns:
        df_raw (pd.Series): processed DataFrame from the CSV file columns selected
    """

    try:
        csv_path = os.path.join(settings.BASE_DIR, "static", "data", file_name)
        if os.path.exists(csv_path):
            print(f"Correctly accessed the file '{file_name}'")
        else:
            raise FileNotFoundError(f"File does not exist at '{csv_path}'")

    except Exception as error:
        raise Exception(f"Error loading wind data: {str(error)}")

    # Read the CSV file on the columns sent as argument
    df_raw = pd.read_csv(csv_path, usecols=col_names)

    # Transform date column to datetime object
    df_raw["dtm"] = pd.to_datetime(df_raw["dtm"])

    return df_raw
