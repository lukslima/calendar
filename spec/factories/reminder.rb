FactoryBot.define do
  factory :reminder do
    title { Faker::Lorem.word }
    date { Faker::Date.in_date_period }
    time { Faker::Time.between(from: DateTime.now - 5, to: DateTime.now + 5) }
    color { Faker::Color.hex_color }
  end
end
