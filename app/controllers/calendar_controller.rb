class CalendarController < ApplicationController
  def index
    @calendar = CalendarService.call(calendar_params)
  end

  private

  def calendar_params
    params.permit(:year, :month)
  end
end
