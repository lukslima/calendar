class ReminderSerializer < ActiveModel::Serializer
  attributes :id, :title, :date, :military_time, :formated_time, :color
end