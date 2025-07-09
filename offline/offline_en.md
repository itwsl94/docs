
# Siliconstorm Reasoning interface documentation

## Interface Function
Provides text/streaming reasoning processing capabilities.

## API Method
Method：POST 

**URL**：https://api.siliconstorm.ai/v1/chat/completions
```bash
curl --location --request POST 'https://api.siliconstorm.ai/v1/chat/completions' 
--header 'Authorization: Bearer {ApiKey}' 
--header 'Content-Type: application/json' 
--header 'Accept: */*' 
--header 'Host: api.siliconstorm.ai' 
--header 'Connection: keep-alive' 
--data-raw '{
  "model": "DeepSeek-R1",
  "messages": [
    {
      "content": "Write a helloword and explain the code",
      "role": "user"
    }
  ],
  "stream":true
}'
```
# Request Parameters

<table cellpadding="4" cellspacing="0" frame="border" border="1" rules="all" data-header="7">
    <thead align="left">
       <tr>
           <th align="left" colspan="4" valign="top"><p>Parameter</p></th>
           <th align="left" valign="top"><p>Required</p></th>
           <th align="left" valign="top"><p>Description</p></th>
           <th align="left" valign="top"><p>Value Requirements</p></th>
       </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="4"><p>model</p></td>
            <td><p>Required</p></td>
            <td><p>Model Name</p></td>
            <td><p>Must match the value of `modelName` in the MindIE Server configuration file.</p></td>
        </tr>
        <tr>
            <td colspan="4"><p>messages</p></td>
            <td><p>Required</p></td>
            <td><p>Inference request message structure.</p></td>
            <td><p>List type, with the number of characters in the `messages` content being between 0KB and 4MB. Supports both Chinese and English. The number of tokens after tokenization should be less than or equal to the minimum value among `maxInputTokenLen`, `maxSeqLen - 1`, `max_position_embeddings`, and 1MB. The `max_position_embeddings` is obtained from the weight file `config.json`, and other related parameters are taken from the configuration file.</p></td>
        </tr>
        <tr>
            <td rowspan="12"><p>-</p></td>
            <td colspan="3"><p>role</p></td>
            <td><p>Required</p></td>
            <td><p>Inference request message role.</p></td>
            <td>
                <p>String type. Possible roles are:</p>
                <ul>
                    <li>system: System role</li>
                    <li>user: User role</li>
                    <li>assistant: Assistant role</li>
                    <li>tool: Tool role</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td colspan="3"><p>content</p></td>
            <td><p>必选</p></td>
            <td><p>推理请求内容。单模态文本模型为string类型，多模态模型为list类型。</p></td>
            <td>
                <ul>
                    <li>
                        <p>string:</p>
                        <ul>
                            <li>If the role is 'assistant' and tool_calls is not empty, content can be omitted; for other roles, content must be provided.</li>
                            <li>In other cases, content must be provided.</li>
                        </ul>
                    </li>
                    <li>list: Follows the example format of multimodal model 'inputs' parameter.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td rowspan="5"><p>-</p></td>
            <td colspan="2"><p>type</p></td>
            <td><p>Optional</p></td>
            <td><p>Type of inference request content.</p></td>
            <td>
                <ul>
                    <li>text: Text</li>
                    <li>image_url: Image</li>
                    <li>video_url: Video</li>
                    <li>audio_url: Audio</li>
                </ul>
                <p>The total number of image_url, video_url, and audio_url in a single request should be &lt;= 20.</p>
            </td>
        </tr>
        <tr>
            <td colspan="2"><p>text</p></td>
            <td><p>Optional</p></td>
            <td><p>The inference request content is text.</p></td>
            <td><p>Cannot be empty, supports both Chinese and English.</p></td>
        </tr>
        <tr>
            <td colspan="2"><p>image_url</p></td>
            <td><p>Optional</p></td>
            <td><p>The inference request content is an image.</p></td>
            <td><p>Supports images from server local paths, image types support jpg, png, jpeg, and base64 encoded jpg images. Supports image URLs with both HTTP and HTTPS protocols. The maximum image size supported is 20MB.</p></td>
        </tr>
        <tr>
            <td colspan="2"><p>video_url</p></td>
            <td><p>Optional</p></td>
            <td><p>The inference request content is a video.</p></td>
            <td><p>Supports videos from server local paths, video types support MP4, AVI, WMV, and video URLs with both HTTP and HTTPS protocols. The maximum video size supported is 512MB.</p></td>
        </tr>
        <tr>
            <td colspan="2"><p>audio_url</p></td>
            <td><p>Optional</p></td>
            <td><p>The inference request content is audio.</p></td>
            <td><p>Supports audio from server local paths, audio types support MP3, WAV, FLAC, and audio URLs with both HTTP and HTTPS protocols. The maximum audio size supported is 20MB.</p></td>
        </tr>
        <tr>
            <td colspan="3"><p>tool_calls</p></td>
            <td><p>Optional</p></td>
            <td><p>Tool calls generated by the model.</p></td>
            <td><p>Type is List[dict]. When the role is assistant, it represents the model's call to the tool.</p></td>
        </tr>
        <tr>
            <td rowspan="3"><p>-</p></td>
            <td colspan="2"><p>function</p></td>
            <td><p>Required</p></td>
            <td><p>Represents the tool invoked by the model.</p></td>
            <td>
                <p>Type is dict.</p>
                <ul>
                    <li>arguments, required, a JSON-formatted string representing the parameters for the function call.</li>
                    <li>name, required, a string representing the name of the function being called.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td colspan="2"><p>id</p></td>
            <td><p>Required</p></td>
            <td><p>Represents the ID of a specific tool invocation by the model.</p></td>
            <td><p>String.</p></td>
        </tr>
        <tr>
            <td colspan="2"><p>type</p></td>
            <td><p>Required</p></td>
            <td><p>The type of tool being invoked.</p></td>
            <td><p>String, only supports "function".</p></td>
        </tr>
        <tr>
            <td colspan="3"><p>tool_call_id</p></td>
            <td><p>Required when the role is "tool", otherwise optional.</p></td>
            <td><p>Associates with the ID of the model’s tool invocation.</p></td>
            <td><p>String.</p></td>
        </tr>
        <tr>
            <td colspan="4"><p>stream</p></td>
            <td><p>Optional</p></td>
            <td><p>Specifies whether the result should be text-based inference or stream-based inference.</p></td>
            <td>
                <p>Boolean type, default value is false.</p>
                <ul>
                    <li>true: Stream-based inference.</li>
                    <li>false: Text-based inference.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td colspan="4"><p>presence_penalty</p></td>
            <td><p>Optional</p></td>
            <td><p>The presence penalty ranges from -2.0 to 2.0 and affects how the model penalizes new tokens based on whether they have appeared in the text so far. Positive values will penalize words already used, increasing the likelihood of the model introducing new topics.</p></td>
            <td><p>Float type, value range [-2.0, 2.0], default value 0.0.</p></td>
        </tr>
        <tr>
            <td colspan="4"><p>frequency_penalty</p></td>
            <td><p>Optional</p></td>
            <td><p>The frequency penalty ranges from -2.0 to 2.0 and influences how the model penalizes new words based on the existing frequency of words in the text. Positive values will penalize frequently used words, reducing the likelihood of repetition in a line.</p></td>
            <td><p>Float type, value range [-2.0, 2.0], default value 0.0.</p></td>
        </tr>
        <tr>
            <td colspan="4"><p>repetition_penalty</p></td>
            <td><p>Optional</p></td>
            <td><p>The repetition penalty is a technique used to reduce the probability of repeating segments in text generation. It penalizes previously generated text, making the model more likely to choose new, non-repetitive content.</p></td>
            <td><p>Float type, value range (0.0, 2.0], default value 1.0.</p></td>
        </tr>
        <tr>
            <td colspan="4"><p>temperature</p></td>
            <td><p>Optional</p></td>
            <td><p>Controls the randomness of the generated output, with higher values producing more diverse outputs.</p></td>
            <td>
                <p>Float type, value range [0.0, 2.0], default value 1.0.</p>
                <p>The higher the value, the greater the randomness of the result. It is recommended to use a value greater than or equal to 0.001, as values below 0.001 may lead to poor text quality.</p>
            </td>
        </tr>
        <tr>
            <td colspan="4"><p>top_p</p></td>
            <td><p>Optional</p></td>
            <td><p>Controls the range of words considered by the model during generation by using cumulative probability to select candidate words until the cumulative probability exceeds the given threshold. This parameter can also control the diversity of the generated result by selecting candidate words based on cumulative probability.</p></td>
            <td><p>Float type, value range (0.0, 1.0], default value 1.0.</p></td>
        </tr>
        <tr>
            <td colspan="4"><p>top_k</p></td>
            <td><p>Optional</p></td>
            <td><p>Controls the range of words considered by the model during generation by selecting only from the top k candidate words with the highest probabilities.</p></td>
            <td>
                <p>Int32 type, value range [0, 2147483647], default value determined by the backend model when the field is not set. For more details, refer to <a href="mindie_service0062.html" data-outer="inner" data-href="mindie_service0062.html" data-doc="true" target="_blank" data-multiple-screen="true">documentation</a>.</p>
                <p>If the value is greater than or equal to vocabSize, the default value will be vocabSize.</p>
                <p>vocabSize is read from the config.json file under the modelWeightPath directory. It is recommended that users add the vocab_size or padded_vocab_size parameters to config.json to avoid inference failures.</p>
            </td>
        </tr>
        <tr>
            <td colspan="4"><p>seed</p></td>
            <td><p>Optional</p></td>
            <td><p>Used to specify the random seed for the inference process. The same seed value ensures reproducibility of inference results, while different seed values increase the randomness of the results.</p></td>
            <td>
                <p>UInt64 type, value range [0, 18446744073709551615]. If not provided, the system generates a random seed value.</p>
                <p>A WARNING may appear when the seed approaches the maximum value, but it will not affect usage. To remove the WARNING, you can reduce the seed value.</p>
            </td>
        </tr>
        <tr>
            <td colspan="4"><p>stop</p></td>
            <td><p>Optional</p></td>
            <td><p>Text to stop the inference. The output result does not include the stop words by default.</p></td>
            <td>
                <p>List[string] type or string type, default value null.</p>
                <ul>
                    <li>For List[string], the number of elements should not exceed 1024, with each element having a length of 1-1024. The total length of the list elements should not exceed 32768 (256*128). An empty list is equivalent to null.</li>
                    <li>For string type, the length range is 1~1024 characters.</li>
                </ul>
                <p>PD-separated scenarios do not support this parameter.</p>
            </td>
        </tr>
        <tr>
            <td colspan="4"><p>stop_token_ids</p></td>
            <td><p>Optional</p></td>
            <td><p>List of token IDs to stop the inference. The output result does not include the token IDs in the stop inference list by default.</p></td>
            <td><p>List[int32] type, elements exceeding int32 will be ignored, default value is null.</p></td>
        </tr>
        <tr>
            <td colspan="4"><p>include_stop_str_in_output</p></td>
            <td><p>Optional</p></td>
            <td><p>Determines whether to include the stop string in the generated inference text.</p></td>
            <td>
                <p>Bool type, default value is false.</p>
                <ul>
                    <li>true: Includes stop string.</li>
                    <li>false: Does not include stop string.</li>
                </ul>
                <p>If stop or stop_token_ids is not provided, this field will be ignored.</p>
                <p>PD-separated scenarios do not support this parameter.</p>
            </td>
        </tr>
        <tr>
            <td colspan="4"><p>skip_special_tokens</p></td>
            <td><p>Optional</p></td>
            <td><p>Specifies whether to skip special tokens in the generated inference text.</p></td>
            <td>
                <p>Bool type, default value is true.</p>
                <ul>
                    <li>true: Skip special tokens.</li>
                    <li>false: Retain special tokens.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td colspan="4"><p>ignore_eos</p></td>
            <td><p>Optional</p></td>
            <td><p>Specifies whether to ignore the eos_token end symbol during inference text generation.</p></td>
            <td>
                <p>Bool type, default value is false.</p>
                <ul>
                    <li>true: Ignore eos_token end symbol.</li>
                    <li>false: Do not ignore eos_token end symbol.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td colspan="4"><p>max_tokens</p></td>
            <td><p>Optional</p></td>
            <td><p>Specifies the maximum number of tokens allowed in the generated inference. The actual number of tokens generated is also affected by the maxIterTimes parameter in the configuration file, and the generated token count is less than or equal to min(maxIterTimes, max_tokens).</p></td>
            <td><p>Int type, range (0, 2147483647], default value is maxIterTimes.</p></td>
        </tr>
        <tr>
            <td colspan="4"><p>tools</p></td>
            <td><p>Optional</p></td>
            <td><p>A list of tools that may be used.</p></td>
            <td><p>List[dict] type.</p></td>
        </tr>
        <tr>
            <td rowspan="10"><p>-</p></td>
            <td colspan="3"><p>type</p></td>
            <td><p>Required</p></td>
            <td><p>Indicates the tool type.</p></td>
            <td><p>Only supports the string "function".</p></td>
        </tr>
        <tr>
            <td colspan="3"><p>function</p></td>
            <td><p>Required</p></td>
            <td><p>Function description.</p></td>
            <td><p>dict type.</p></td>
        </tr>
        <tr>
            <td rowspan="8"><p>-</p></td>
            <td colspan="2"><p>name</p></td>
            <td><p>Required</p></td>
            <td><p>Function name.</p></td>
            <td><p>String.</p></td>
        </tr>
        <tr>
            <td colspan="2"><p>strict</p></td>
            <td><p>Optional</p></td>
            <td><p>Indicates whether the generated tool calls strictly follow the schema format.</p></td>
            <td><p>bool type, default is false.</p></td>
        </tr>
        <tr>
            <td colspan="2"><p>description</p></td>
            <td><p>Optional</p></td>
            <td><p>Describes the function's functionality and usage.</p></td>
            <td><p>String.</p></td>
        </tr>
        <tr>
            <td colspan="2"><p>parameters</p></td>
            <td><p>Optional</p></td>
            <td><p>Indicates the parameters accepted by the function.</p></td>
            <td><p>JSON schema format.</p></td>
        </tr>
        <tr>
            <td rowspan="4"><p>-</p></td>
            <td><p>type</p></td>
            <td><p>Required</p></td>
            <td><p>Indicates the type of the function parameter's attribute.</p></td>
            <td><p>String, only supports "object".</p></td>
        </tr>
        <tr>
            <td><p>properties</p></td>
            <td><p>Required</p></td>
            <td><p>Properties of the function parameters. Each key represents a parameter name, which can be defined by the user. The value is of type dict, representing the parameter description, containing type and description fields.</p></td>
            <td><p>dict type.</p></td>
        </tr>
        <tr>
            <td><p>required</p></td>
            <td><p>Required</p></td>
            <td><p>Indicates the list of required parameters for the function.</p></td>
            <td><p>List[string] type.</p></td>
        </tr>
       <tr>
           <td><p>additionalProperties</p></td>
           <td><p>Optional</p></td>
           <td><p>Indicates whether additional unmentioned parameters are allowed.</p></td>
           <td>
               <p>bool type, default value is false.</p>
               <ul>
                   <li>true: Allows additional unmentioned parameters.</li>
                   <li>false: Does not allow additional unmentioned parameters.</li>
               </ul>
           </td>
       </tr>
       <tr>
           <td colspan="4"><p>tool_choice</p></td>
           <td><p>Optional</p></td>
           <td><p>Controls whether the model calls a tool.</p></td>
           <td>
               <p>string type or dict type, can be null, default value is "auto".</p>
               <ul>
                   <li>"none": Indicates that the model will not call any tools and will generate a message instead.</li>
                   <li>"auto": Indicates that the model can either generate a message or call one or more tools.</li>
                   <li>"required": Indicates that the model must call one or more tools.</li>
               </ul>
               <p>By specifying {"{type: 'function', function: {name: 'my_function'}}"} you can specify a particular tool, forcing the model to call that tool.</p>
           </td>
       </tr>
    </tbody>
</table>

# Usage Examples

## Single-turn conversation：

#### Single-modal model：

```json
{
    "model": "DeepSeek-R1",
    "messages": [{
        "role": "user",
        "content": "You are a helpful assistant."
    }],
    "stream": false,
    "presence_penalty": 1.03,
    "frequency_penalty": 1.0,
    "repetition_penalty": 1.0,
    "temperature": 0.5,
    "top_p": 0.95,
    "top_k": 0,
    "seed": null,
    "stop": ["stop1", "stop2"],
    "stop_token_ids": [2, 13],
    "include_stop_str_in_output": false,
    "skip_special_tokens": true,
    "ignore_eos": false,
    "max_tokens": 20
}
```

#### Multimodal model：
Note: The value of the “image_url” parameter should be modified according to the actual situation.

```json
{
    "model": "DeepSeek-R1",
    "messages": [{
        "role": "user",
        "content": [
           {"type": "text", "text": "My name is Olivier and I"},
           {"type": "image_url", "image_url": "/xxxx/test.png"}
        ]
    }],
    "stream": false,
    "presence_penalty": 1.03,
    "frequency_penalty": 1.0,
    "repetition_penalty": 1.0,
    "temperature": 0.5,
    "top_p": 0.95,
    "top_k": 0,
    "seed": null,
    "stop": ["stop1", "stop2"],
    "stop_token_ids": [2, 13],
    "include_stop_str_in_output": false,
    "skip_special_tokens": true,
    "ignore_eos": false,
    "max_tokens": 20
}
```

## Multi-turn conversation

#### Request Example 1：

```json
{
    "model": "DeepSeek-R1",
    "messages": [{
        "role": "system",
        "content": "You are a helpful customer support assistant. Use the supplied tools to assist the user."
        },
        {
        "role": "user",
        "content": "Hi, can you tell me the delivery date for my order? my order id is 12345."
        }
    ],
    "stream": false,
    "presence_penalty": 1.03,
    "frequency_penalty": 1.0,
    "repetition_penalty": 1.0,
    "temperature": 0.5,
    "top_p": 0.95,
    "top_k": 0,
    "seed": null,
    "stop": ["stop1", "stop2"],
    "stop_token_ids": [2],
    "ignore_eos": false,
    "max_tokens": 1024,
    "tools": [
        {
            "type": "function",
            "function": {
                "name": "get_delivery_date",
                "strict": true,
                "description": "Get the delivery date for a customer's order. Call this whenever you need to know the delivery date, for example when a customer asks 'Where is my package'",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "order_id": {
                            "type": "string",
                            "description": "The customer's order ID."
                        }
                    },
                    "required": [
                        "order_id"
                    ],
                    "additionalProperties": false
                }
            }
        }
    ],
   "tool_choice": "auto"
}
```

#### Request Example 2：
```json
{
    "model": "DeepSeek-R1",
    "messages": [
        {
            "role": "system",
            "content": "You are a helpful customer support assistant. Use the supplied tools to assist the user."
        },
        {
            "role": "user",
            "content": "Hi, can you tell me the delivery date for my order? my order id is 12345."
        },
        {
            "role": "assistant",
            "tool_calls": [
                {
                    "function": {
                        "arguments": "{\"order_id\": \"12345\"}",
                        "name": "get_delivery_date"
                    },
                    "id": "tool_call_8p2Nk",
                    "type": "function"
                }
            ]
        },
        {
            "role": "tool",
            "content": "the delivery date is 2024.09.10.",
            "tool_call_id": "tool_call_8p2Nk"
        }
    ],
    "stream": false,
    "repetition_penalty": 1.1,
    "temperature": 0.9,
    "top_p": 1,
    "max_tokens": 1024,
    "tools": [
        {
            "type": "function",
            "function": {
                "name": "get_delivery_date",
                "strict": true,
                "description": "Get the delivery date for a customer's order. Call this whenever you need to know the delivery date, for example when a customer asks 'Where is my package'",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "order_id": {
                            "type": "string",
                            "description": "The customer's order ID."
                        }
                    },
                    "required": [
                        "order_id"
                    ],
                    "additionalProperties": false
                }
            }
        }
    ],
    "tool_choice": "auto"
}
```

## Response Example：
Text Inference (“stream”=false)：

### Single-turn conversation：

```json
{
    "id": "chatcmpl-123",
    "object": "chat.completion",
    "created": 1677652288,
    "model": "DeepSeek-R1",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "\n\nHello there, how may I assist you today?"
            },
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 9,
        "completion_tokens": 12,
        "total_tokens": 21
    },
    "prefill_time": 200,
    "decode_time_arr": [56, 28, 28]
}
```
### Multi-turn conversation：

#### Response Example 1：

```json
{
    "id": "chatcmpl-123",
    "object": "chat.completion",
    "created": 1677652288,
    "model": "DeepSeek-R1",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "",
                "tool_calls": [
                    {
                        "function": {
                            "arguments": "{\"order_id\": \"12345\"}",
                            "name": "get_delivery_date"
                        },
                        "id": "call_JwmTNF3O",
                        "type": "function"
                    }
                ]
            },
            "finish_reason": "tool_calls"
        }
    ],
    "usage": {
        "prompt_tokens": 226,
        "completion_tokens": 122,
        "total_tokens": 348
    },
    "prefill_time": 200,
    "decode_time_arr": [56, 28, 28]
}

```
#### Response Example 2：
```json
{
    "id": "endpoint_common_25",
    "object": "chat.completion",
    "created": 1728959154,
    "model": "DeepSeek-R1",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "\n Your order with ID 12345 is scheduled for delivery on September 10th, 2024.",
                "tool_calls": null
            },
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 265,
        "completion_tokens": 30,
        "total_tokens": 295
    },
    "prefill_time": 200,
    "decode_time_arr": [56, 28, 28]
}

```

### Streaming Inference：

#### Streaming Inference 1

(“stream”=true, using sse format return)：

```json

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"\t"},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"\t"},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","usage":{"prompt_tokens":54,"completion_tokens":17,"total_tokens":71},"choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":"stop"}]}

data: [DONE]
```
#### Streaming Inference 2

(“stream”=true, with configuration “fullTextEnabled”=true, using sse format return)：

```json
data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello!"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How can"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How can I"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How can I assist"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How can I assist you"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How can I assist you today"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How can I assist you today?"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","full_text":"Hello! How can I assist you today?","usage":{"prompt_tokens":31,"completion_tokens":10,"total_tokens":41},"choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How can I assist you today?"},"finish_reason":"length"}]}

data: [DONE]
```

## Output Explanation
### Table 1

Explanation of text inference results

<table cellpadding="4" cellspacing="0" frame="border" border="1" rules="all" data-header="7">
    <thead align="left">
        <tr>
            <th align="left" colspan="5"><p>Parameter Name</p></th>
            <th align="left"><p>Type</p></th>
            <th align="left"><p>Description</p></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="5"><p>id</p></td>
            <td><p>string</p></td>
            <td><p>Request ID.</p></td>
        </tr>
        <tr>
            <td colspan="5"><p>object</p></td>
            <td><p>string</p></td>
            <td><p>The type of the returned result, currently always "chat.completion".</p></td>
        </tr>
        <tr>
            <td colspan="5"><p>created</p></td>
            <td><p>integer</p></td>
            <td><p>Inference request timestamp, accurate to the second.</p></td>
        </tr>
        <tr>
            <td colspan="5"><p>model</p></td>
            <td><p>string</p></td>
            <td><p>The inference model used.</p></td>
        </tr>
        <tr>
            <td colspan="5"><p>choices</p></td>
            <td><p>list</p></td>
            <td><p>List of inference results.</p></td>
        </tr>
        <tr>
            <td rowspan="11"><p>-</p></td>
            <td colspan="4"><p>index</p></td>
            <td><p>integer</p></td>
            <td><p>Index of the choices message, currently only 0.</p></td>
        </tr>
        <tr>
            <td colspan="4"><p>message</p></td>
            <td><p>object</p></td>
            <td><p>Inference message.</p></td>
        </tr>
        <tr>
            <td rowspan="8"><p>-</p></td>
            <td colspan="3"><p>role</p></td>
            <td><p>string</p></td>
            <td><p>Role, currently always returns "assistant".</p></td>
        </tr>
        <tr>
            <td colspan="3"><p>content</p></td>
            <td><p>string</p></td>
            <td><p>Inference text result.</p></td>
        </tr>
        <tr>
            <td colspan="3"><p>tool_calls</p></td>
            <td><p>list</p></td>
            <td><p>Model tool invocation output.</p></td>
        </tr>
        <tr>
            <td rowspan="5"><p>-</p></td>
            <td colspan="2"><p>function</p></td>
            <td><p>dict</p></td>
            <td><p>Function call description.</p></td>
        </tr>
        <tr>
            <td rowspan="2"><p>-</p></td>
            <td><p>arguments</p></td>
            <td><p>string</p></td>
            <td><p>Arguments for the function call, a JSON-formatted string.</p></td>
        </tr>
        <tr>
            <td><p>name</p></td>
            <td><p>string</p></td>
            <td><p>Name of the called function.</p></td>
        </tr>
        <tr>
            <td colspan="2"><p>id</p></td>
            <td><p>string</p></td>
            <td><p>ID of the model's tool invocation.</p></td>
        </tr>
        <tr>
            <td colspan="2"><p>type</p></td>
            <td><p>string</p></td>
            <td><p>Type of the tool, currently only supports "function".</p></td>
        </tr>
        <tr>
            <td colspan="4"><p>finish_reason</p></td>
            <td><p>string</p></td>
            <td>
                <p>Reason for completion.</p>
                <ul>
                    <li>
                        stop:
                        <ul>
                            <li>Request was CANCELLED or STOPPED, user is unaware, response is discarded.</li>
                            <li>Error occurred during execution, response output is empty, err_msg is non-empty.</li>
                            <li>Input validation exception, response output is empty, err_msg is non-empty.</li>
                            <li>Request ended normally upon encountering the eos (end of stream) symbol.</li>
                        </ul>
                    </li>
                    <li>
                        length:
                        <ul>
                            <li>Request ended due to reaching the maximum sequence length, response is the output of the last iteration.</li>
                            <li>Request ended due to reaching the maximum output length (including request and model granularity), response is the output of the last iteration.</li>
                        </ul>
                    </li>
                    <li>tool_calls: Indicates that the model called a tool.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td colspan="5"><p>usage</p></td>
            <td><p>object</p></td>
            <td><p>Inference result statistics data.</p></td>
        </tr>
        <tr>
            <td rowspan="3"><p>-</p></td>
            <td colspan="4"><p>prompt_tokens</p></td>
            <td><p>int</p></td>
            <td><p>Token length corresponding to the user input prompt text.</p></td>
        </tr>
        <tr>
            <td colspan="4"><p>completion_tokens</p></td>
            <td><p>int</p></td>
            <td>
                <p>Number of tokens in the inference result. In the PD scenario, it counts the total token number of both P and D inference results. When the inference length limit for a request is set to maxIterTimes, the D node response's completion_tokens count is maxIterTimes+1, i.e., it includes the first token from the P inference result.</p>
            </td>
        </tr>
        <tr>
            <td colspan="4"><p>total_tokens</p></td>
            <td><p>int</p></td>
            <td><p>Total token count for the request and inference.</p></td>
        </tr>
        <tr>
            <td colspan="5"><p>prefill_time</p></td>
            <td><p>float</p></td>
            <td><p>Time delay for the first token of the inference.</p></td>
        </tr>
        <tr>
            <td colspan="5"><p>decode_time_arr</p></td>
            <td><p>list</p></td>
            <td><p>Array of time delays during the inference decoding process.</p></td>
        </tr>
    </tbody>
</table>

### Table 2

Explanation of Streaming Inference Results

<table cellpadding="4" cellspacing="0" frame="border" border="1" rules="all" data-header="6">
    <thead align="left">
        <tr>
            <th align="left" colspan="4" valign="top"><p>Parameter Name</p></th>
            <th align="left" valign="top"><p>Type</p></th>
            <th align="left" valign="top"><p>Description</p></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="4" valign="top"><p>data</p></td>
            <td valign="top"><p>object</p></td>
            <td valign="top"><p>The result of a single inference.</p></td>
        </tr>
        <tr>
            <td rowspan="15" valign="top"><p>-</p></td>
            <td colspan="3" valign="top"><p>id</p></td>
            <td valign="top"><p>string</p></td>
            <td valign="top"><p>Request ID.</p></td>
        </tr>
        <tr>
            <td colspan="3" valign="top"><p>object</p></td>
            <td valign="top"><p>string</p></td>
            <td valign="top"><p>Currently returns "chat.completion.chunk".</p></td>
        </tr>
        <tr>
            <td colspan="3" valign="top"><p>created</p></td>
            <td valign="top"><p>integer</p></td>
            <td valign="top"><p>Inference request timestamp, accurate to the second.</p></td>
        </tr>
        <tr>
            <td colspan="3" valign="top"><p>model</p></td>
            <td valign="top"><p>string</p></td>
            <td valign="top"><p>The inference model used.</p></td>
        </tr>
        <tr>
            <td colspan="3" valign="top"><p>full_text</p></td>
            <td valign="top"><p>string</p></td>
            <td valign="top">
                <p>Full text result, only returned when the configuration item <span>“fullTextEnabled”</span> is set to true.</p>
            </td>
        </tr>
        <tr>
            <td colspan="3" valign="top"><p>usage</p></td>
            <td valign="top"><p>object</p></td>
            <td valign="top"><p>Inference result statistics.</p></td>
        </tr>
        <tr>
            <td rowspan="3" valign="top"><p>-</p></td>
            <td colspan="2" valign="top"><p>prompt_tokens</p></td>
            <td valign="top"><p>int</p></td>
            <td valign="top"><p>The token length corresponding to the user-input prompt text.</p></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><p>completion_tokens</p></td>
            <td valign="top"><p>int</p></td>
            <td valign="top">
                <p>The number of tokens in the inference result. In PD scenarios, it counts the total tokens of both P and D inference results. When the inference length limit for a request is set to the value of maxIterTimes, the D node response will have a completion_tokens count of maxIterTimes + 1, which adds the first token of the P inference result.</p>
            </td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><p>total_tokens</p></td>
            <td valign="top"><p>int</p></td>
            <td valign="top"><p>The total number of tokens for the request and inference.</p></td>
        </tr>
        <tr>
            <td colspan="3" valign="top"><p>choices</p></td>
            <td valign="top"><p>list</p></td>
            <td valign="top"><p>Streaming inference results.</p></td>
        </tr>
        <tr>
            <td rowspan="5" valign="top"><p>-</p></td>
            <td colspan="2" valign="top"><p>index</p></td>
            <td valign="top"><p>integer</p></td>
            <td valign="top"><p>The choices message index, which can only be 0 currently.</p></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><p>delta</p></td>
            <td valign="top"><p>object</p></td>
            <td valign="top"><p>The inference return result, the last response is empty.</p></td>
        </tr>
        <tr>
            <td rowspan="2" valign="top"><p>-</p></td>
            <td valign="top"><p>role</p></td>
            <td valign="top"><p>string</p></td>
            <td valign="top"><p>The role, currently always returns "assistant".</p></td>
        </tr>
        <tr>
            <td valign="top"><p>content</p></td>
            <td valign="top"><p>string</p></td>
            <td valign="top"><p>The inference text result.</p></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><p>finish_reason</p></td>
            <td valign="top"><p>string</p></td>
            <td valign="top">
                <p>Reason for completion, returned only in the final inference result.</p>
                <ul>
                    <li>
                        stop:
                        <ul>
                            <li>The request was CANCELLED or STOPPED, without user awareness, and the response is discarded.</li>
                            <li>An error occurred during request execution, and the response is empty with a non-empty err_msg.</li>
                            <li>Input validation for the request failed, with the response being empty and err_msg non-empty.</li>
                            <li>The request ended normally due to encountering an EOS (End of Stream) symbol.</li>
                        </ul>
                    </li>
                    <li>
                        length:
                        <ul>
                            <li>The request ended because it reached the maximum sequence length, and the response is the output from the last iteration.</li>
                            <li>The request ended because it reached the maximum output length (including both the request and model-level length), and the response is the output from the last iteration.</li>
                        </ul>
                    </li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

# Sample Response


## Single-turn conversation：

Text inference (“stream”=false)：

```json
{
    "id": "chatcmpl-123",
    "object": "chat.completion",
    "created": 1677652288,
    "model": "DeepSeek-R1",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "\n\nHello there, how may I assist you today?"
            },
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 9,
        "completion_tokens": 12,
        "total_tokens": 21
    },
    "prefill_time": 200,
    "decode_time_arr": [56, 28, 28]
}
```
## Multi-turn conversation：

#### Response example 1：

```json
{
    "id": "chatcmpl-123",
    "object": "chat.completion",
    "created": 1677652288,
    "model": "DeepSeek-R1",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "",
                "tool_calls": [
                    {
                        "function": {
                            "arguments": "{\"order_id\": \"12345\"}",
                            "name": "get_delivery_date"
                        },
                        "id": "call_JwmTNF3O",
                        "type": "function"
                    }
                ]
            },
            "finish_reason": "tool_calls"
        }
    ],
    "usage": {
        "prompt_tokens": 226,
        "completion_tokens": 122,
        "total_tokens": 348
    },
    "prefill_time": 200,
    "decode_time_arr": [56, 28, 28]
}
```

#### Response example 2：
```json
{
    "id": "endpoint_common_25",
    "object": "chat.completion",
    "created": 1728959154,
    "model": "DeepSeek-R1",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "\n Your order with ID 12345 is scheduled for delivery on September 10th, 2024.",
                "tool_calls": null
            },
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 265,
        "completion_tokens": 30,
        "total_tokens": 295
    },
    "prefill_time": 200,
    "decode_time_arr": [56, 28, 28]
}
```
# streaming Inference



### Streamed Inference 1

(“stream”=true, return in SSE format)：

```json

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"\t"},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"\t"},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"endpoint_common_8","object":"chat.completion.chunk","created":1729614610,"model":"DeepSeek-R1","usage":{"prompt_tokens":54,"completion_tokens":17,"total_tokens":71},"choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":"stop"}]}

data: [DONE]
```


#### Streamed Inference 2

(“stream”=true, with configuration “fullTextEnabled”=true, return in SSE format)：

```json
data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello!"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How can"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How can I"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How can I assist"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How can I assist you"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How can I assist you today"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How can I assist you today?"},"finish_reason":null}]}

data: {"id":"endpoint_common_11","object":"chat.completion.chunk","created":1730184192,"model":"DeepSeek-R1","full_text":"Hello! How can I assist you today?","usage":{"prompt_tokens":31,"completion_tokens":10,"total_tokens":41},"choices":[{"index":0,"delta":{"role":"assistant","content":"Hello! How can I assist you today?"},"finish_reason":"length"}]}

data: [DONE]
```

## Output Description

#### Table 1

Text Inference Result Description

<table cellpadding="4" cellspacing="0" frame="border" border="1" rules="all" data-header="7">
    <thead align="left">
        <tr>
            <th align="left" colspan="5"><p>Parameter Name</p></th>
            <th align="left"><p>Type</p></th>
            <th align="left"><p>Description</p></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="5"><p>id</p></td>
            <td><p>string</p></td>
            <td><p>Request ID.</p></td>
        </tr>
        <tr>
            <td colspan="5"><p>object</p></td>
            <td><p>string</p></td>
            <td><p>The return result type, currently always "chat.completion".</p></td>
        </tr>
        <tr>
            <td colspan="5"><p>created</p></td>
            <td><p>integer</p></td>
            <td><p>Inference request timestamp, accurate to the second.</p></td>
        </tr>
        <tr>
            <td colspan="5"><p>model</p></td>
            <td><p>string</p></td>
            <td><p>Inference model used.</p></td>
        </tr>
        <tr>
            <td colspan="5"><p>choices</p></td>
            <td><p>list</p></td>
            <td><p>List of inference results.</p></td>
        </tr>
        <tr>
            <td rowspan="11"><p>-</p></td>
            <td colspan="4"><p>index</p></td>
            <td><p>integer</p></td>
            <td><p>Choice message index, currently only 0 is allowed.</p></td>
        </tr>
        <tr>
            <td colspan="4"><p>message</p></td>
            <td><p>object</p></td>
            <td><p>Inference message.</p></td>
        </tr>
        <tr>
            <td rowspan="8"><p>-</p></td>
            <td colspan="3"><p>role</p></td>
            <td><p>string</p></td>
            <td><p>Role, currently always "assistant".</p></td>
        </tr>
        <tr>
            <td colspan="3"><p>content</p></td>
            <td><p>string</p></td>
            <td><p>Inference text result.</p></td>
        </tr>
        <tr>
            <td colspan="3"><p>tool_calls</p></td>
            <td><p>list</p></td>
            <td><p>Model tool call output.</p></td>
        </tr>
        <tr>
            <td rowspan="5"><p>-</p></td>
            <td colspan="2"><p>function</p></td>
            <td><p>dict</p></td>
            <td><p>Function call description.</p></td>
        </tr>
        <tr>
            <td rowspan="2"><p>-</p></td>
            <td><p>arguments</p></td>
            <td><p>string</p></td>
            <td><p>Arguments for calling the function, in JSON string format.</p></td>
        </tr>
        <tr>
            <td><p>name</p></td>
            <td><p>string</p></td>
            <td><p>Name of the called function.</p></td>
        </tr>
        <tr>
            <td colspan="2"><p>id</p></td>
            <td><p>string</p></td>
            <td><p>Tool call ID for the model's tool invocation.</p></td>
        </tr>
        <tr>
            <td colspan="2"><p>type</p></td>
            <td><p>string</p></td>
            <td><p>Tool type, currently only supports "function".</p></td>
        </tr>
        <tr>
            <td colspan="4"><p>finish_reason</p></td>
            <td><p>string</p></td>
            <td>
                <p>Reason for completion.</p>
                <ul>
                    <li>
                        stop：
                        <ul>
                            <li>The request was CANCELLED or STOPPED, not visible to the user, and the response is discarded.</li>
                            <li>An error occurred during the request execution, and the response output is empty, with the err_msg non-empty.</li>
                            <li>An input validation exception occurred during the request, and the response output is empty, with the err_msg non-empty.</li>
                            <li>The request ends normally due to encountering the eos (end-of-sequence) symbol.</li>
                        </ul>
                    </li>
                    <li>
                        length：
                        <ul>
                            <li>The request ends due to reaching the maximum sequence length, and the response is the output of the last iteration.</li>
                            <li>The request ends due to reaching the maximum output length (including request and model granularity), and the response is the output of the last iteration.</li>
                        </ul>
                    </li>
                    <li>tool_calls: Indicates that the model invoked a tool.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td colspan="5"><p>usage</p></td>
            <td><p>object</p></td>
            <td><p>Inference result statistics data.</p></td>
        </tr>
        <tr>
            <td rowspan="3"><p>-</p></td>
            <td colspan="4"><p>prompt_tokens</p></td>
            <td><p>int</p></td>
            <td><p>Token length of the user's input prompt text.</p></td>
        </tr>
        <tr>
            <td colspan="4"><p>completion_tokens</p></td>
            <td><p>int</p></td>
            <td>
                <p>Number of tokens in the inference result. In the PD scenario, it counts the total token number of P and D inference results. When the maximum inference length of a request is set to maxIterTimes, the D node's response will have completion_tokens equal to maxIterTimes+1, which includes the first token of the P inference result.</p>
            </td>
        </tr>
        <tr>
            <td colspan="4"><p>total_tokens</p></td>
            <td><p>int</p></td>
            <td><p>Total number of tokens for the request and inference.</p></td>
        </tr>
        <tr>
            <td colspan="5"><p>prefill_time</p></td>
            <td><p>float</p></td>
            <td><p>Time delay for the first token of inference.</p></td>
        </tr>
        <tr>
            <td colspan="5"><p>decode_time_arr</p></td>
            <td><p>list</p></td>
            <td><p>Array of decoding time delays for inference.</p></td>
        </tr>
    </tbody>
</table>

#### Table 2

Streamed Inference Result Description

<table cellpadding="4" cellspacing="0" frame="border" border="1" rules="all" data-header="6">
    <thead align="left">
        <tr>
            <th align="left" colspan="4" valign="top"><p>Parameter Name</p></th>
            <th align="left" valign="top"><p>Type</p></th>
            <th align="left" valign="top"><p>Description</p></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="4" valign="top"><p>data</p></td>
            <td valign="top"><p>object</p></td>
            <td valign="top"><p>Result returned from a single inference.</p></td>
        </tr>
        <tr>
            <td rowspan="15" valign="top"><p>-</p></td>
            <td colspan="3" valign="top"><p>id</p></td>
            <td valign="top"><p>string</p></td>
            <td valign="top"><p>Request ID.</p></td>
        </tr>
        <tr>
            <td colspan="3" valign="top"><p>object</p></td>
            <td valign="top"><p>string</p></td>
            <td valign="top"><p>Currently always returns "chat.completion.chunk".</p></td>
        </tr>
        <tr>
            <td colspan="3" valign="top"><p>created</p></td>
            <td valign="top"><p>integer</p></td>
            <td valign="top"><p>Inference request timestamp, accurate to the second.</p></td>
        </tr>
        <tr>
            <td colspan="3" valign="top"><p>model</p></td>
            <td valign="top"><p>string</p></td>
            <td valign="top"><p>The inference model used.</p></td>
        </tr>
        <tr>
            <td colspan="3" valign="top"><p>full_text</p></td>
            <td valign="top"><p>string</p></td>
            <td valign="top">
                <p>Full text result, only available when the configuration item <span>“fullTextEnabled”</span> is set to true.</p>
            </td>
        </tr>
        <tr>
            <td colspan="3" valign="top"><p>usage</p></td>
            <td valign="top"><p>object</p></td>
            <td valign="top"><p>Inference result statistics.</p></td>
        </tr>
        <tr>
            <td rowspan="3" valign="top"><p>-</p></td>
            <td colspan="2" valign="top"><p>prompt_tokens</p></td>
            <td valign="top"><p>int</p></td>
            <td valign="top"><p>Token length of the user input prompt text.</p></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><p>completion_tokens</p></td>
            <td valign="top"><p>int</p></td>
            <td valign="top">
                <p>Number of tokens in the inference result. In PD scenarios, this counts the total tokens from both P and D inference results. When the inference length limit of a request is set to maxIterTimes, the D node response will have a completion_tokens count of maxIterTimes+1, meaning it includes the first token of the P inference result.</p>
            </td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><p>total_tokens</p></td>
            <td valign="top"><p>int</p></td>
            <td valign="top"><p>Total number of tokens for the request and inference.</p></td>
        </tr>
        <tr>
            <td colspan="3" valign="top"><p>choices</p></td>
            <td valign="top"><p>list</p></td>
            <td valign="top"><p>Streaming inference results.</p></td>
        </tr>
        <tr>
            <td rowspan="5" valign="top"><p>-</p></td>
            <td colspan="2" valign="top"><p>index</p></td>
            <td valign="top"><p>integer</p></td>
            <td valign="top"><p>Choices message index, currently only 0 is supported.</p></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><p>delta</p></td>
            <td valign="top"><p>object</p></td>
            <td valign="top"><p>Inference result returned, the last response is empty.</p></td>
        </tr>
        <tr>
            <td rowspan="2" valign="top"><p>-</p></td>
            <td valign="top"><p>role</p></td>
            <td valign="top"><p>string</p></td>
            <td valign="top"><p>Role, currently always returns "assistant".</p></td>
        </tr>
        <tr>
            <td valign="top"><p>content</p></td>
            <td valign="top"><p>string</p></td>
            <td valign="top"><p>Inference text result.</p></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><p>finish_reason</p></td>
            <td valign="top"><p>string</p></td>
            <td valign="top">
                <p>Reason for finishing, only returned in the last inference result.</p>
                <ul>
                    <li>
                        stop:
                        <ul>
                            <li>The request was CANCELLED or STOPPED, the user is unaware, and the response is discarded.</li>
                            <li>An error occurred during the execution of the request, the response is empty, and err_msg is not empty.</li>
                            <li>The request input validation failed, the response is empty, and err_msg is not empty.</li>
                            <li>The request finished normally when encountering the eos (end-of-stream) delimiter.</li>
                        </ul>
                    </li>
                    <li>
                        length:
                        <ul>
                            <li>The request ended because the maximum sequence length was reached, the response is the output from the last iteration.</li>
                            <li>The request ended because the maximum output length (including request and model granularity) was reached, the response is the output from the last iteration.</li>
                        </ul>
                    </li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>


# Error status code description
The following exceptions are returned by the http response. Model exceptions are captured and processed in the flow.

#### Example：

```json
{
  "code": 701,
  "result": null,
  "message": 'Insufficient balance'
}
```

| code | illustrate                     |
|------|------------------------|
| 701  | Insufficient balance                   |
| 702  | Authorization not passed        |
| 801  | Apikey error               |
| 802  | Request timeout                   |
| 9999 | Model response exception, handle according to message prompts |
