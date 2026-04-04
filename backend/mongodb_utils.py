from bson import ObjectId
from typing import Union, List

def fix_id(doc):
    """
    Ensures MongoDB document has 'id' field as string.
    Keeps '_id' for backend use if needed.
    """
    if not doc:
        return doc
    
    # Ensure _id exists (from database)
    if "_id" in doc:
        doc["id"] = str(doc["_id"])
    elif "id" in doc and not "_id" in doc:
        # If it came from some other source and only has id
        try:
            doc["_id"] = ObjectId(doc["id"])
        except:
            pass
            
    return doc

def fix_ids(docs):
    return [fix_id(doc) for doc in docs]

def to_object_id(id_val: Union[str, int, ObjectId]) -> Union[ObjectId, int]:
    if isinstance(id_val, ObjectId):
        return id_val
    try:
        return ObjectId(str(id_val))
    except:
        return id_val
