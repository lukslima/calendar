require 'rails_helper'

RSpec.describe 'Reminders API', type: :request do
  let(:reminder) { create(:reminder) }
  let(:reminder_id) { reminder.id }

  shared_examples 'a not found record' do
    it 'returns status code 404' do
      expect(response).to have_http_status(404)
    end

    it 'returns a not found message' do
      expect(response.body).to match(/Couldn't find Reminder/)
    end
  end
  
  describe 'GET /api/v1/reminders/:id/edit' do
    before { get edit_api_v1_reminder_path(reminder_id) }

    context 'when the record exists' do
      it 'returns the reminder' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(reminder_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:reminder_id) { 100 }

      it_behaves_like 'a not found record'
    end
  end

  describe 'POST /api/v1/reminders' do
    let(:reminder_attributes) { attributes_for(:reminder) }

    before { post api_v1_reminders_path, params: reminder_attributes }

    context 'when the request is valid' do
      

      it 'creates a reminder' do
        expect(json['title']).to eq(reminder_attributes[:title])
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      let(:reminder_attributes) { attributes_for(:reminder, color: 'invalid-color') }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Color/)
      end
    end
  end

  describe 'PUT /api/v1/reminders/:id' do
    let(:reminder_attributes) { attributes_for(:reminder, title: 'New Reminder') }

    before { put api_v1_reminder_path(reminder_id), params: reminder_attributes }

    context 'when the record exists' do
      it 'updates the record' do
        expect(reminder.reload.title).to eq('New Reminder')
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end

    context 'when the record does not exist' do
      let(:reminder_id) { 100 }

      it_behaves_like 'a not found record'
    end
  end

  describe 'DELETE /api/v1/reminders/:id' do
    before { delete api_v1_reminder_path(reminder_id) }

    context 'when the record exists' do
      it 'deletes the record' do
        expect(Reminder.where(id: reminder_id)).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
    
    context 'when the record does not exist' do
      let(:reminder_id) { 100 }

      it_behaves_like 'a not found record'
    end
  end
end
