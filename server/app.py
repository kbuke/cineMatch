from flask import request, make_response, session, render_template

from flask_restful import Resource

from config import app, db, api, os

from models import Media, Movies

class AllMedia(Resource):
    def get(self):
        all_media=[media.to_dict() for media in Media.query.all()]
        return all_media, 200 


class AllFilms(Resource):
    def get(self):
        film=[films.to_dict() for films in Movies.query.all()]
        return film, 200

api.add_resource(AllMedia, '/media')
api.add_resource(AllFilms, '/films')

if __name__ == "__main__":
    app.run(port=5555, debug=True)