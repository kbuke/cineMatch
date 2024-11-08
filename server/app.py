from flask import request, make_response, session, render_template

from flask_restful import Resource

from config import app, db, api, os

from models import Media, Movies, TvShows

class AllMedia(Resource):
    def get(self):
        all_media=[media.to_dict() for media in Media.query.all()]
        return all_media, 200 


class AllFilms(Resource):
    def get(self):
        film=[films.to_dict() for films in Movies.query.all()]
        return film, 200

class AllShows(Resource):
    def get(self):
        show=[shows.to_dict() for shows in TvShows.query.all()]
        return show, 200

api.add_resource(AllMedia, '/media')
api.add_resource(AllFilms, '/films')
api.add_resource(AllShows, '/shows')

if __name__ == "__main__":
    app.run(port=5555, debug=True)