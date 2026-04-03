from bson import ObjectId
from typing import Union, List

def fix_id(doc):
    "Converts _id (ObjectId) to id (str or int)"
    if doc and "_id" in doc:
        doc["id"] = str(doc["_id"])
        # No need to remove _id as we use aliases in schemas
    return doc

def fix_ids(docs):
    return [fix_id(doc) for doc in docs]

def to_object_id(id_str: Union[str, int]) -> Union[ObjectId, int]:
    try:
        return ObjectId(id_str)
    except:
        return id_str
