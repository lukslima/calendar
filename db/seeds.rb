# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Reminder.destroy_all

Reminder.create([
  { title: 'Go to supermarket', date: Date.today - 5.days, time: '08:00 AM', color: '#6666ff' },
  { title: 'Go to the gym', date: Date.today - 4.days, time: '08:00 AM', color: '#ff0000' },
  { title: 'Important meeting', date: Date.today - 3.days, time: '08:00 AM', color: '#0000cc' },
  { title: 'Important meeting', date: Date.today - 2.days, time: '08:00 AM', color: '#0000cc' },
  { title: 'Go to the gym', date: Date.today - 2.days, time: '08:00 AM', color: '#ff0000' },
  { title: 'Go to supermarket', date: Date.today - 1.day, time: '08:00 AM', color: '#6666ff' },
  { title: 'Go to the gym', date: Date.today - 1.day, time: '08:00 AM', color: '#ff0000' },
  { title: 'Go to supermarket', date: Date.today - 1.day, time: '08:00 AM', color: '#6666ff' },
  { title: 'Important meeting', date: Date.today, time: '08:00 AM', color: '#0000cc' },
  { title: 'Important meeting', date: Date.today + 1.days, time: '08:00 AM', color: '#0000cc' },
  { title: 'Go to supermarket', date: Date.today + 1.days, time: '08:00 AM', color: '#6666ff' },
  { title: 'Important meeting', date: Date.today + 2.days, time: '08:00 AM', color: '#0000cc' },
  { title: 'Go to supermarket', date: Date.today + 4.days, time: '08:00 AM', color: '#6666ff' },
  { title: 'Go to the gym', date: Date.today + 5.days, time: '08:00 AM', color: '#ff0000' },
  { title: 'Go to supermarket', date: Date.today + 5.days, time: '08:00 AM', color: '#6666ff' }
])
