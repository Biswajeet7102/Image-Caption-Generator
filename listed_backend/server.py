from flask import Flask, request, jsonify
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
import torch
import requests
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

model_name = 'tuner007/pegasus_paraphrase'
torch_device = 'cuda' if torch.cuda.is_available() else 'cpu'
tokenizer = PegasusTokenizer.from_pretrained(model_name)
model = PegasusForConditionalGeneration.from_pretrained(model_name).to(torch_device)

@app.route('/', methods=['POST'])
def generate_paraphrases():

    print(request.get_json())
    link = request.get_json()['img_url']

    # Download and open the image
    raw_image = Image.open(requests.get(link, stream=True).raw).convert('RGB')

    # Get the image caption using the Salesforce model
    from transformers import BlipProcessor, BlipForConditionalGeneration
    processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
    model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")
    inputs = processor(raw_image, return_tensors="pt")
    out = model.generate(**inputs)
    context = processor.decode(out[0], skip_special_tokens=True)

    # Generate paraphrases using the Pegasus model
    num_beams = 10
    num_return_sequences = 10
    paraphrases = get_response(context,num_return_sequences,num_beams)

    # Return the paraphrases as a JSON object
    response = jsonify(paraphrases)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

def get_response(input_text,num_return_sequences,num_beams):
    batch = tokenizer([input_text],truncation=True,padding='longest',max_length=60, return_tensors="pt").to(torch_device)
    translated = model.generate(**batch,max_length=60,num_beams=num_beams, num_return_sequences=num_return_sequences, temperature=1.5)
    tgt_text = tokenizer.batch_decode(translated, skip_special_tokens=True)
    return tgt_text

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
