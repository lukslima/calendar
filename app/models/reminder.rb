class Reminder < ApplicationRecord
  validates :title, presence: true, length: { maximum: 30 }
  validates :date, presence: true
  validates :time, presence: true
  validates :color, presence: true, length: { maximum: 7 }

  scope :from_date, ->(month, year) {
    where(date: Date.new(year, month, 1)..Date.new(year, month, -1))
      .order(:date, :time)
  }

  def military_time
    time.strftime('%R')
  end

  def formated_time
    time.strftime('%I:%M%P')
  end
end
