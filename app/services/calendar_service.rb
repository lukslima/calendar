class CalendarService
  DAY_IN_A_WEEK = 7

  def initialize(date)
    @date = date
  end

  def self.call(params)
    CalendarService.new(params).call
  end

  def call
    today = Date.today
    next_month = @date + 1.month
    previous_month = @date - 1.month

    OpenStruct.new(
      label: @date.strftime('%B %Y'),
      next_month: "/#{next_month.year}/#{next_month.month}",
      previous_month: "/#{previous_month.year}/#{previous_month.month}",
      is_today: (@date.month == today.month) && (@date.year == today.year),
      current_day: today.day,
      month: @date.month.to_s.rjust(2, '0'),
      year: @date.year,
      rows: rows,
    )
  end

  private

  def rows
    defualt_value = ''
    number_of_days = Date.new(@date.year, @date.month, -1).day
    first_week_day = Date.new(@date.year, @date.month).wday
    starting_blank_days = Array.new(first_week_day, defualt_value)
    days_of_the_month = (1..number_of_days).to_a

    [
      *starting_blank_days,
      *days_of_the_month
    ].in_groups_of(DAY_IN_A_WEEK, defualt_value)
  end
end
