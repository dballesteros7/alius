def select_k_and_sort(documents, prefs):
    features = []
    keys = ['anger', 'fear', 'joy', 'disgust', 'sadness']

    for document in documents:
        feature_v = []
        tones = document['tone']

        for key in keys:
            feature_v.append(float(tones[key]))
        feature_v.append(float(document['score']))
        features.append(feature_v)

    submod_set = [documents.pop(0)]
    feature_set = [features.pop(0)]
    feature_maxes = feature_set[0][:-1]
    while len(submod_set) < 10:
        max_idx = None
        max_gain = -float('inf')
        for idx, feature_v in enumerate(features):
            gain = feature_v[-1] + sum(a * b for a, b in zip(feature_v[:-1], [prefs[key] for key in keys]))
            for feature, feature_max in zip(feature_v[:-1], feature_maxes):
                if feature > feature_max:
                    gain -= feature_max
                else:
                    gain -= feature
            if gain > max_gain:
                max_gain = gain
                max_idx = idx

        submod_set.append(documents.pop(max_idx))
        new_features = features.pop(max_idx)
        updated_max = []
        for new_feature, current_max in zip(new_features[:-1], feature_maxes):
            updated_max.append(
                new_feature if new_feature > current_max else current_max)
        feature_set.append(new_features)
        feature_maxes = updated_max
    return submod_set
