package com.ssafy.c202.formybaby.fcm.service;

import com.google.firebase.FirebaseException;
import com.google.firebase.messaging.*;
import com.ssafy.c202.formybaby.fcm.entity.FCMMessage;
import com.ssafy.c202.formybaby.user.entity.Family;
import com.ssafy.c202.formybaby.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
@Slf4j
public class FCMService {

    private final FirebaseMessaging firebaseMessaging;

    public FCMMessage toDangerFcm(String title, String content, String topic, String babyId) {
        return FCMMessage.builder()
                .title(title)
                .body(content)
                .topic(topic)
                .type("danger")
                .babyId(babyId)
                .build();
    }

    public FCMMessage toGeneralFcm(String title, String content, String fcmToken, String type, String babyId) {
        return FCMMessage.builder()
                .title(title)
                .body(content)
                .fcmToken(fcmToken)
                .type(type)
                .babyId(babyId)
                .build();
    }

    public void sendFCM(FCMMessage fcmMessage) {

        Notification googleNotification = Notification.builder()
                .setTitle(fcmMessage.getTitle())
                .setBody(fcmMessage.getBody())
//                .setImage()
                .build();

        Message.Builder messageBuilder = Message.builder()
                .setNotification(googleNotification)
                .putData("type", fcmMessage.getType())
                .putData("babyId", fcmMessage.getBabyId());

        if(fcmMessage.getTopic() != null) {
            messageBuilder.setTopic(fcmMessage.getTopic());
            messageBuilder.setWebpushConfig(WebpushConfig.builder().putHeader("Urgency", "high").build());
        } else if(fcmMessage.getFcmToken() != null) {
            messageBuilder.setToken(fcmMessage.getFcmToken());
        }

        Message message = messageBuilder.build();

        try {
            send(message);
            log.info("FCM SUCCESS : {} ", message);
        } catch(FirebaseException e) {
            log.info("fcm error" + e.getMessage());
        }
    }


    public void sendTest(String fcmToken) {

        Notification googleNotification = Notification.builder()
                .setTitle("Test")
                .setBody("testing...")
//                .setImage()
                .build();

        Message message = Message.builder()
                .setToken(fcmToken)
                .setNotification(googleNotification)
                .putData("key", "BDSwVwVaEvWL1-Rws1skaQEjBCcvi4TP1TWicodeN49yC7LBjI-0t5rTb6cohFPxeYH88RWWajNm5fMtell2mhw")
                .build();

        try{
            send(message);
            log.info("sending test : " + message.toString());
        } catch(FirebaseException e) {
            log.info("fcm error : " + e.getMessage());
        }
    }

    public void send(Message message) throws FirebaseException {
        firebaseMessaging.sendAsync(message);
    }

    public void unsubscribe(String token, String topic) throws FirebaseMessagingException {
        firebaseMessaging.unsubscribeFromTopic(Arrays.asList(token), topic);
    }
    public void subscribe(String token, String topic) throws FirebaseMessagingException {
        firebaseMessaging.subscribeToTopic(Arrays.asList(token), topic);
    }
}