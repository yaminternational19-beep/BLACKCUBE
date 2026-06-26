from rest_framework import serializers
from .models import Page, PageField

class PageFieldSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='field_id')
    type = serializers.CharField(source='field_type')
    
    class Meta:
        model = PageField
        fields = ['id', 'label', 'type', 'value']

class PageSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='page_id')
    fields = PageFieldSerializer(many=True, required=False)

    class Meta:
        model = Page
        fields = ['id', 'title', 'fields']

    def create(self, validated_data):
        fields_data = validated_data.pop('fields', [])
        page = Page.objects.create(**validated_data)
        for field_data in fields_data:
            PageField.objects.create(page=page, **field_data)
        return page

    def update(self, instance, validated_data):
        fields_data = validated_data.pop('fields', [])
        instance.title = validated_data.get('title', instance.title)
        instance.save()

        # Update or create fields
        existing_fields = {field.field_id: field for field in instance.fields.all()}
        
        for field_data in fields_data:
            field_id = field_data.get('field_id')
            if field_id in existing_fields:
                field = existing_fields[field_id]
                field.label = field_data.get('label', field.label)
                field.field_type = field_data.get('field_type', field.field_type)
                field.value = field_data.get('value', field.value)
                field.save()
            else:
                PageField.objects.create(page=instance, **field_data)

        return instance
