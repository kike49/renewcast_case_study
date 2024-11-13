# External imports
from datetime import datetime
from ninja import NinjaAPI
from typing import List

# Project imports
from app_api.schemas import MinMaxDateRange, TimeSeriesData
from app_api.utils import load_wind_data


# Define the Ninja API
api = NinjaAPI()

## ENDPOINTS
# GET - Retrieves data from a file
@api.get("/", response=List[TimeSeriesData])
def get_wind_data(request, start_date: datetime, end_date: datetime):
    """
    Get wind data with from a file with given start and end date to filter the data range.

    Args:
        start_date (datetime): Start date of the data filtered
        end_date (datetime): End date of the data filtered
    """

    # Load the full dataset from the CSV file and filter with the date arguments
    df_raw = load_wind_data("Energy_Data_20200920_20240118.csv", ["dtm", "Wind_MW"])
    df_raw = df_raw[(df_raw["dtm"] >= start_date) & (df_raw["dtm"] <= end_date)]

    # Rename columns and transform to JSON format
    result = df_raw.rename(columns={"dtm": "timestamp", "Wind_MW": "wind_mw"}).to_dict("records")

    return result


@api.get("/cap-dates/", response=MinMaxDateRange)
def get_cap_dates(request):
    """
    Get the minimum and maximum dates from the wind data dataset.
    """

    # Load the full dataset from the CSV file
    df_raw = load_wind_data("Energy_Data_20200920_20240118.csv", ["dtm"])

    # Get earliest and oldest date on the dataset to send to the frontend for validation
    min_date = df_raw["dtm"].min().to_pydatetime()
    max_date = df_raw["dtm"].max().to_pydatetime()

    return MinMaxDateRange(min_date=min_date, max_date=max_date)
