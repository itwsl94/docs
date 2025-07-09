/**
 * @name: customerService
 * @author: sand
 * @date: 2025-03-21 14:59
 * @description：kefy
 * @update: 2025-03-21 14:59
 */

const script = document.createElement('script')
// 设置 script 标签的属性
script.src = 'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.2.0-beta.5/libs/oversea/index.js'

// 监听 script 加载完成事件
script.onload = function () {
    new CozeWebSDK.WebChatClient({
        config: {
            bot_id: '7484166014775967752',
        },
        componentProps: {
            title: 'Coding Master',
        },
        auth: {
            type: 'token',
            token: 'pat_sXnzeuecTR0xYUcvuxwyVQ4uKwJarRtF6PaPKJpTVTwPxQjCxYnZ5yK7NBSJyTLT',
            onRefreshToken: function () {
                return 'pat_sXnzeuecTR0xYUcvuxwyVQ4uKwJarRtF6PaPKJpTVTwPxQjCxYnZ5yK7NBSJyTLT';
            }
        }
    });
};

// 将 <script> 标签添加到 <body> 的末尾
document.body.appendChild(script)

