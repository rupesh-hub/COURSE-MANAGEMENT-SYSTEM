package com.alfarays.image.mapper;

import com.alfarays.image.entity.Image;
import com.alfarays.image.model.ImageResponse;

public final class ImageMapper {

    private ImageMapper() {
    }

    public static ImageResponse toResponse(Image image) {
        ImageResponse response = new ImageResponse();
        response.setId(image.getId());
        response.setName(image.getName());
        response.setPath(image.getPath());
        response.setSize(image.getSize());
        response.setType(image.getType());
        return response;
    }

}
