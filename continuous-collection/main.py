from google.cloud import storage

base_types = {
    "roles": {
        "top": int,
        "jg": int,
        "mid": int,
        "adc": int,
        "sup": int
    },
    "bans": {
        "ban1": int,
        "ban2": int,
        "ban3": int,
        "ban4": int,
        "ban5": int
    },
    "dodged": [-1, 0, 1],
    "redTeamWin": [-1, 0, 1],
    "elo": ["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND", "MASTER", "GRAND-MASTER", "CHALLENGER"],
    "region": ["BR1", "EUN1", "EUW1", "JP1", "KR", "LA1", "LA2", "NA1", "OC1", "TR1", "RU"]
}


def validate_bans(ban: dict):
    if set(ban) != set(base_types['bans']):
        return False
    
    for k, v in ban.items():
        if k not in base_types['bans'] or type(v) is not base_types['bans'][k]:
            return False
    return True


def validate_team(team: dict):
    if set(team) != set(base_types['roles']):
        return False
    
    for k, v in team.items():
        if k not in base_types['roles'] or type(v) is not base_types['roles'][k]:
            return False
    return True


def validate_json(request_input):
    try:
        dodge = request_input['dodged'] in base_types['dodged']
        red_won = request_input['redTeamWin'] in base_types['redTeamWin']
        elo = request_input['elo'] in base_types['elo']
        region = request_input['region'] in base_types['region']
        
        red_bans = validate_bans(request_input['redTeam']['bans'])
        blue_bans = validate_bans(request_input['blueTeam']['bans'])
        
        red_team = validate_team(request_input['redTeam']['roles'])
        blue_team = validate_team(request_input['blueTeam']['roles'])
        return all([dodge, red_won, elo, region, red_bans, blue_bans, red_team, blue_team])
    except KeyError:
        return False


def create_csv_row(js):
    return '{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} \n'.format(
        js['region'], js['elo'], js['dodged'],
        
        js['redTeam']['bans']['ban1'], js['redTeam']['bans']['ban2'],
        js['redTeam']['bans']['ban3'], js['redTeam']['bans']['ban4'], js['redTeam']['bans']['ban5'],
        
        js['redTeam']['roles']['top'], js['redTeam']['roles']['jg'],
        js['redTeam']['roles']['mid'], js['redTeam']['roles']['adc'], js['redTeam']['roles']['sup'],
        
        js['blueTeam']['bans']['ban1'], js['blueTeam']['bans']['ban2'],
        js['blueTeam']['bans']['ban3'], js['blueTeam']['bans']['ban4'], js['blueTeam']['bans']['ban5'],
       
        js['blueTeam']['roles']['top'], js['blueTeam']['roles']['jg'],
        js['blueTeam']['roles']['mid'], js['blueTeam']['roles']['adc'], js['blueTeam']['roles']['sup'],
        js['redTeamWin']
    )


def append_to_collection(request):
    if request.method != 'POST':
        return 'Only Post allowed!', 405
    
    request_json = request.get_json()

    if not request_json:
        return 'Missing JSON request body', 403
    
    if not validate_json(request_json):
        return 'Error in Json format', 403
    
    if request_json['dodged'] == -1 and request_json['redTeamWin'] == -1:
        return 'Cannot have a dodged game and a played game', 403
    
    client = storage.Client()
    base_path = "/tmp/"
    
    continuous_bucket = client.get_bucket('dodge-bot-continous-collection')
    f = continuous_bucket.get_blob('template.csv')
    f.download_to_filename(base_path + f.name)
    
    with open(base_path + f.name, 'a') as fd:
        fd.write(create_csv_row(request_json))
    
    blob = continuous_bucket.blob(f.name)
    blob.upload_from_filename(base_path + f.name)
    return '', 200
