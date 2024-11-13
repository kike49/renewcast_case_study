from datetime import datetime
from ninja import Schema


class TimeSeriesData(Schema):
    timestamp: datetime
    wind_mw: float


class MinMaxDateRange(Schema):
    min_date: datetime
    max_date: datetime
