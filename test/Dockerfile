FROM gliderlabs/alpine
ENV SLEEP_FOR=2
RUN apk add --no-cache bash
COPY ./entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]