class CalendarController < ApplicationController
  before_action :set_date

  def index
    @calendar = CalendarService.call(@date)
    @reminders = Reminder.from_date(@date.month, @date.year)
  end

  private

  def set_date
    year = calendar_params[:year]
    month = calendar_params[:month]

    unless year || month
      @date = Date.today 
    else
      @date = Date.new(year.to_i, month.to_i)
    end
  end

  def calendar_params
    params.permit(:year, :month)
  end
end
